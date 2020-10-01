import React from 'react';
import { List } from 'antd';

import GameCard from '../../components/GameCard/GameCard';

const GameList = ({ games }) => {
    return (
        <List
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
