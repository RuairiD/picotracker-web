import React from 'react';
import { List, Typography } from 'antd';

import GameCard from '../../components/GameCard/GameCard';

const GameList = ({ games, loading }) => {
    if ((!games || games.length === 0) && !loading.spinning) {
        return (
            <div style={{ textAlign: 'center' }}>
                <Typography.Text type="secondary">No carts here :(</Typography.Text>
            </div>
        );
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
