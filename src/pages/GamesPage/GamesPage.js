import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Divider, Typography, Layout, Menu, Dropdown, Spin } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import apiRoot from '../../apiRoot';
import GameList from '../../components/GameList/GameList';

const GAMES_QUERY = `query Games($timeframe: String) {
    games(timeframe: $timeframe) {
        bbsId
        name
        stars
        comments
        timeCreated
        imageUrl
        developer {
            bbsId
            username
        }
    }
}`;

const PageHeader = () => (
    <div style={{ textAlign: 'center', margin: '1em' }}>
        <Typography.Title>
            picotracker
        </Typography.Title>
        <Typography.Title level={3}>
            the hottest pico-8 games
        </Typography.Title>
    </div>
);

const TIMEFRAMES = {
    0: {
        title: "Today",
        value: "day",
    },
    1: {
        title: "This week",
        value: "week",
    },
    2: {
        title: "This month",
        value: "month",
    },
}

const TimeframeMenu = ({ onClick, currentMenuKey }) => (
    <Menu
        onClick={onClick}
        selectedKeys={[currentMenuKey]}
    >
        {Object.keys(TIMEFRAMES).map(function(key) {
            return <Menu.Item key={key}>
                {TIMEFRAMES[key].title}
            </Menu.Item>
        })}
    </Menu>
);

const TimeframeDropdown = ({ currentMenuKey, setCurrentMenuKey }) => (
    <Dropdown
        overlay={
            <TimeframeMenu
                onClick={
                    event => {
                        setCurrentMenuKey(event.key)
                    }
                }
                currentMenuKey={currentMenuKey} />
        }
        trigger={['click']}
    >
        <Typography.Title level={5} style={{ padding: '2em', marginBottom: '1em' }}>
            {TIMEFRAMES[currentMenuKey].title} <DownOutlined />
        </Typography.Title>
    </Dropdown>
);

// TODO: Nicked this from howsmytrack to fill out the page while content is loading. Should probably
// figure this out. Maybe in 2 or 3 projects time.
const TRANSPARENT_TEXT = (
    <Typography.Paragraph style={{ opacity: 0, height: 0, width: '100%' }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed hendrerit leo. Donec vitae risus et ante egestas sollicitudin at a mi. Duis fringilla a mi ut congue. Sed elit nunc, mollis sit amet interdum id, viverra vitae ligula. Proin eu risus vitae turpis fermentum maximus. Phasellus finibus enim nibh, non cursus lorem auctor interdum. Sed a ex id magna ultricies gravida. Proin sit amet sem at quam tristique tristique sit amet sed augue. Cras in bibendum risus, eu consequat turpis. In sed commodo augue. Donec nibh nulla, viverra quis mi tincidunt, pulvinar interdum neque. 
    </Typography.Paragraph>
);

const GamesPage = () => {
    const [currentMenuKey, setCurrentMenuKey] = useState("1");

    const fetchGames = async () => {
        const response = await fetch(apiRoot + '/graphql/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: GAMES_QUERY,
                variables: { timeframe: TIMEFRAMES[currentMenuKey].value}
            }),
            credentials: 'include',
        });
        const data = await response.json();
        return data.data.games;
    };

    const { isLoading, data: games } = useQuery([GAMES_QUERY, currentMenuKey], fetchGames);

    return (
        <Layout className="page-container">
            <div className="page-container-inner">
                <Layout.Content className="page-content">
                    <Layout className="content">
                        <PageHeader />
                        <Divider />
                        <Layout.Content>
                            <TimeframeDropdown
                                currentMenuKey={currentMenuKey}
                                setCurrentMenuKey={setCurrentMenuKey}
                            />
                            <GameList games={games} loading={{
                                size: "large",
                                spinning: isLoading,
                            }} />
                            {TRANSPARENT_TEXT}
                        </Layout.Content>

                        <Layout.Footer style={{ textAlign: 'center' }}>
                            <Divider />
                            <Typography.Paragraph>
                                <Typography.Text strong>
                                    <a target="_blank" rel="noopener noreferrer" href="http://ruairidorrity.com">ruairi dorrity</a> &#47;&#47; <a target="_blank" rel="noopener noreferrer" href="https://www.lexaloffle.com/bbs/?uid=46702">ruairi dx</a>
                                </Typography.Text>
                            </Typography.Paragraph>
                        </Layout.Footer>
                    </Layout>
                </Layout.Content>
            </div>
        </Layout>
    )
};

export default GamesPage;
