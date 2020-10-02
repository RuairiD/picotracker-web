import React from 'react';
import dateFormat from 'dateformat';
import { Card } from 'antd';
import { StarOutlined, CommentOutlined } from '@ant-design/icons';

const GameDescription = ({
    stars,
    comments,
    timeCreated,
    developer,
}) => (
    <div>
        <div>
            <StarOutlined /> {stars} <CommentOutlined /> {comments}
        </div>
        <div>
            {dateFormat(
                new Date(Date.parse(timeCreated)),
                'mmm dS yyyy',
            )}
        </div>
        <div>
            <a target="_blank" rel="noopener noreferrer" href={"https://www.lexaloffle.com/bbs/?uid=" + developer.bbsId}>By {developer.username}</a>
        </div>
    </div>
);

const GameCard = ({
    bbsId,
    name,
    stars,
    comments,
    timeCreated,
    imageUrl,
    developer,
}) => (
    <Card
        cover={
            <a target="_blank" rel="noopener noreferrer" href={"https://www.lexaloffle.com/bbs/?pid=" + bbsId}>
                <img style={{ width: "100%" }} alt={name} src={"https://www.lexaloffle.com" + imageUrl} />
            </a>
        }
    >
        <Card.Meta
            title={name}
            description={
                <GameDescription
                    stars={stars}
                    comments={comments}
                    timeCreated={timeCreated}
                    developer={developer}
                />
            }
        />
    </Card>
);

export default GameCard;
