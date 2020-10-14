import React, { useRef, useState, useEffect } from 'react';
import dateFormat from 'dateformat';
import { Card, Typography } from 'antd';
import { StarOutlined, CommentOutlined } from '@ant-design/icons';
import { A, Div, Img } from 'lemon-reset';

const GameDescription = ({
    stars,
    comments,
    timeCreated,
    developer,
    tags,
}) => (
    <Div>
        <Div>
            <StarOutlined /> {stars} <CommentOutlined /> {comments}
        </Div>
        <Div>
            {dateFormat(
                new Date(Date.parse(timeCreated)),
                'mmm dS yyyy',
            )} {tags && tags.length > 0 && <Typography.Text type="secondary" style={{ paddingLeft: '0.5em' }}>#{tags[0]}</Typography.Text>}
        </Div>
        <Div>
            <A target="_blank" rel="noopener noreferrer" href={"https://www.lexaloffle.com/bbs/?uid=" + developer.bbsId}>By {developer.username}</A>
        </Div>
    </Div>
);

const Thumbnail = ({
    bbsId,
    imageUrl,
    name,
}) => {
    const imgRef = useRef(null);

    const [height, setHeight] = useState(null);

    useEffect(() => {
        setHeight(imgRef.current.clientWidth);
    }, []);

    let opacity = 0;
    if (!!height) {
        opacity = 1;
    }

    return (
        <Div style={{
            transition: 'opacity 1s',
            opacity: opacity,
            width: "100%",
            display: 'block',
            height: height,
        }}>
            <A target="_blank" rel="noopener noreferrer" href={"https://www.lexaloffle.com/bbs/?pid=" + bbsId}>
                <Img ref={imgRef} alt={name} style={{ width: "100%" }} src={"https://www.lexaloffle.com" + imageUrl} />
            </A>
        </Div>
    )
}

const GameCard = ({
    bbsId,
    name,
    stars,
    comments,
    timeCreated,
    imageUrl,
    developer,
    tags,
}) => (
    <Card cover={<Thumbnail bbsId={bbsId} imageUrl={imageUrl} name={name} />}>
        <Card.Meta
            title={name}
            description={
                <GameDescription
                    stars={stars}
                    comments={comments}
                    timeCreated={timeCreated}
                    developer={developer}
                    tags={tags}
                />
            }
        />
    </Card>
);

export default GameCard;
