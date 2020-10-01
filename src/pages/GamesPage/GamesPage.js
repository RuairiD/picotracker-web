import React from 'react';
import { useQuery } from 'react-query';
import { Divider, Typography, Layout } from 'antd';

import apiRoot from '../../apiRoot';
import GameList from '../../components/GameList/GameList';

const GAMES_QUERY = `query Games {
    games {
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

const fetchGames = async () => {
    const response = await fetch(apiRoot + '/graphql/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: GAMES_QUERY,
        }),
        credentials: 'include',
    });
    const data = await response.json();
    return data.data.games;
};

const GamesPage = () => {
    const { data: games } = useQuery([GAMES_QUERY], fetchGames);

    return (
        <Layout className="page-container">
            <div className="page-container-inner">
                <Layout.Content className="page-content">
                    <Layout className="content">
                        <PageHeader />
                        <Divider />
                        <Layout.Content>
                            <GameList games={games} />
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
