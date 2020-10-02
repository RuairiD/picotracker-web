import React from 'react';

import { Modal, Typography } from 'antd';

const InfoModal = ({
    isVisible,
    onCancel,
})  => (
    <Modal
        title="What is this?"
        onCancel={onCancel}
        visible={isVisible}
        footer={null}
        destroyOnClose
        className="responsive-modal"
    >
        <Typography.Paragraph>
            <em>picotracker</em> provides an alternative sorting system to the <a target="_blank" rel="noopener noreferrer" href="https://www.lexaloffle.com/bbs/?cat=7#sub=2">Lexaloffle BBS</a>. Games are ranked based on their BBS engagement and their release dates; newer games are prioritised to ensure you don't miss any new releases.
        </Typography.Paragraph>
    </Modal>
);

export default InfoModal;