import React from 'react';
import { A, Em } from 'lemon-reset';

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
            <Em>picotracker</Em> provides an alternative sorting system to the <A target="_blank" rel="noopener noreferrer" href="https://www.lexaloffle.com/bbs/?cat=7#sub=2">Lexaloffle BBS</A>. Games are ranked based on their BBS engagement and their release dates; newer games are prioritised to ensure you don't miss any new releases.
        </Typography.Paragraph>
    </Modal>
);

export default InfoModal;