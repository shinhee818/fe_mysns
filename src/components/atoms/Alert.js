import React, {useEffect} from 'react';
import { Alert, Space } from 'antd';

export const SuccessAlert = ({ visible,onClose }) =>{
    useEffect(() => {
        let timer;
        if (visible) {
            timer = setTimeout(() => {
                onClose(); // Alert가 닫힌 후 호출될 함수
            }, 1000); // 3000 밀리초 (3초) 후에 Alert를 닫음
        }

        return () => {
            clearTimeout(timer); // 컴포넌트가 언마운트되면 타이머를 정리
        };
    }, [visible, onClose]);

    return(
        <Space direction="vertical" style={{ width: '100%' }}>
            {visible &&<Alert message="삭제되었습니다." type="success" showIcon />}
        </Space>

    )
}
