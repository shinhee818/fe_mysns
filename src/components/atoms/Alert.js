import React, {useEffect} from 'react';
import { Alert, Space } from 'antd';

export const SuccessAlert = ({ visible,onClose }) =>{
    useEffect(() => {
        let timer;
        if (visible) {
            timer = setTimeout(() => {
                onClose();
            }, 1000);
        }

        return () => {
            clearTimeout(timer);
        };
    }, [visible, onClose]);

    return(
        <Space direction="vertical" style={{ width: '100%' }}>
            {visible &&<Alert message="삭제되었습니다." type="success" showIcon />}
        </Space>

    )
}
