import React, { useState } from 'react';
import HttpsRedirect from 'react-https-redirect';
import { useQuery } from 'react-query';
import { Button, Divider, Typography, Layout, Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { A, Div } from 'lemon-reset';

import apiRoot from '../../apiRoot';
import GameList from '../../components/GameList/GameList';
import InfoModal from '../../components/InfoModal/InfoModal';

const GAMES_QUERY = `query Games($sortMethod: String) {
    games(sortMethod: $sortMethod) {
        bbsId
        name
        stars
        comments
        timeCreated
        imageUrl
        tags
        developer {
            bbsId
            username
        }
    }
}`;

const PageHeader = ({ infoModalIsVisible, setInfoModalIsVisible }) => (
    <Div style={{ textAlign: 'center' }}>
        <Div style={{ fontFamily: 'CaveStoryRegular' }}>
            <Typography.Title style={{ fontSize: '64px', margin: 0, letterSpacing: '2px', whiteSpace: 'nowrap' }}>
                picotracker
            </Typography.Title>
            <Typography.Title level={3} style={{ margin: 0 }}>
                the hottest pico-8 carts
            </Typography.Title>
        </Div>
        <Button type="link" onClick={() => setInfoModalIsVisible(true)}>
            What is this?
        </Button>
        <InfoModal isVisible={infoModalIsVisible} onCancel={() => setInfoModalIsVisible(false)} />
    </Div>
);

const SORT_METHODS = {
    0: {
        title: "Hot",
        value: "hot",
    },
    1: {
        title: "Top - Today",
        value: "day",
    },
    2: {
        title: "Top - This week",
        value: "week",
    },
    3: {
        title: "Top - This month",
        value: "month",
    },
}

const SortMethodMenu = ({ onClick, currentMenuKey }) => (
    <Menu
        onClick={onClick}
        selectedKeys={[currentMenuKey]}
    >
        {Object.keys(SORT_METHODS).map(key => {
            return <Menu.Item key={key}>
                {SORT_METHODS[key].title}
            </Menu.Item>
        })}
    </Menu>
);

const SortMethodDropdown = ({ currentMenuKey, setCurrentMenuKey }) => (
    <Div style={{ paddingTop: '1em', paddingBottom: '2em', textAlign: 'center' }}>
        <Dropdown
            overlay={
                <SortMethodMenu
                    onClick={
                        event => {
                            setCurrentMenuKey(event.key)
                        }
                    }
                    currentMenuKey={currentMenuKey} />
            }
            trigger={['click']}
        >
            <Button type="link">
                <Typography.Title level={5}>
                    {SORT_METHODS[currentMenuKey].title} <DownOutlined />
                </Typography.Title>
            </Button>
        </Dropdown>
    </Div>
);

// TODO: Nicked this from howsmytrack to fill out the page while content is loading. Should probably
// figure this out. Maybe in 2 or 3 projects time.
const TRANSPARENT_TEXT = (
    <Typography.Paragraph style={{ opacity: 0, height: 0, width: '100%' }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed hendrerit leo. Donec vitae risus et ante egestas sollicitudin at a mi. Duis fringilla a mi ut congue.
    </Typography.Paragraph>
);

const GamesPage = () => {
    const [currentMenuKey, setCurrentMenuKey] = useState("0");
    const [infoModalIsVisible, setInfoModalIsVisible] = useState(false);

    const fetchGames = async () => {
        const response = await fetch(apiRoot + '/graphql/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: GAMES_QUERY,
                variables: { sortMethod: SORT_METHODS[currentMenuKey].value}
            }),
            credentials: 'include',
        });
        const data = await response.json();
        return data.data.games;
    };

    const { isLoading, data: games } = useQuery([GAMES_QUERY, currentMenuKey], fetchGames);

    return (
        <HttpsRedirect>
            <Layout className="page-container">
                <Div className="page-container-inner">
                    <Layout.Content className="page-content">
                        <Layout className="content">
                            <PageHeader infoModalIsVisible={infoModalIsVisible} setInfoModalIsVisible={setInfoModalIsVisible} />
                            <Divider />
                            <Layout.Content style={{ minHeight: '100vh' }}>
                                <SortMethodDropdown
                                    currentMenuKey={currentMenuKey}
                                    setCurrentMenuKey={setCurrentMenuKey}
                                />
                                <GameList games={games} loading={{
                                    size: "large",
                                    spinning: isLoading,
                                }} />
                            </Layout.Content>

                            <Layout.Footer style={{ textAlign: 'center' }}>
                                <Divider />
                                <Typography.Paragraph>
                                    <Typography.Text strong>
                                        <A target="_blank" rel="noopener noreferrer" href="http://ruairidorrity.com">ruairi dorrity</A> &#47;&#47; <A target="_blank" rel="noopener noreferrer" href="https://www.lexaloffle.com/bbs/?uid=46702">ruairi dx</A>
                                    </Typography.Text>
                                    {TRANSPARENT_TEXT}
                                </Typography.Paragraph>
                                <Typography.Paragraph>
                                    <Typography.Text strong>source</Typography.Text><br />
                                    <Typography.Text>
                                        <A target="_blank" rel="noopener noreferrer" href="https://github.com/ruairid/picotracker-api">api</A> &#47;&#47; <A target="_blank" rel="noopener noreferrer" href="https://github.com/ruairid/picotracker-web">web</A>
                                    </Typography.Text>
                                </Typography.Paragraph>
                            </Layout.Footer>
                        </Layout>
                    </Layout.Content>
                </Div>
            </Layout>
        </HttpsRedirect>
    )
};

export default GamesPage;
