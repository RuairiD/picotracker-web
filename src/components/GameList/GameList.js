import React from 'react';
import { List, Typography } from 'antd';

import GameCard from '../../components/GameCard/GameCard';

const GameList = ({ games, loading }) => {
    if ((!games || games.length === 0) && !loading.spinning) {
        return <Typography.Title level={5} style={{ textAlign: 'center' }}>Nothing here!</Typography.Title>;
    }
    return (
        <List
            loading={loading}
            grid={{
                gutter: 8,
                xs: 1,
                sm: 2,
                md: 3,
                lg: 3,
                xl: 3,
                xxl: 3,
            }}
            dataSource={games}
            renderItem={item => (
                <List.Item>
                    <GameCard
                        {...item}
                    />
                </List.Item>
            )}
        />
    )
};

export default GameList;
