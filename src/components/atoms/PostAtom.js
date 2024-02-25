import styled from "styled-components";
import my from "../media/profile.png";
import React, {useState} from 'react';
import {MoreOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import {deletePost} from "../api/PostApi";
import {SuccessAlert} from "./Alert";
import InputModal from "./InputModal";

export const HorizonCon = styled.div`
  display: flex;
  align-items: center;
  `
export const MyImg = styled.div`
    border-radius: 100%;
    width:40px;
    height: 40px;
    background-image:url(${props => props.imageUrl});
  background-size: 100%;
    `



export const NickName = styled.div`
    font-size: 15px;
    margin-left: 10px;
    
    `

export const PostFont = styled.div`
    font-size: 15px;
    margin-left: 10px;
  font-weight: bold;
    
    `

export const Content = styled.div`
    font-size: 15px;
    margin-left: 10px;
    
    `
export const Footer = styled.div`
  width:90%;

  background-color: rgba(255, 255, 255, 0.5);
  position: fixed;
    bottom: 0px; /* 화면 아래에 고정 */
    display: grid;
  grid-template-columns: repeat(3, 2fr);
  align-items: center;
    justify-content: center;
    justify-items: center;
    padding: 10px;
    z-index: 100;
`;

export const MenuBtn = ({postId,post,getMemberPostData,onClose}) =>{
    const [showAlert, setShowAlert] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleAlertClose = () => {
        setShowAlert(false);
        // 여기에 Alert가 닫힌 후 실행될 로직을 추가할 수 있습니다.
    };

    const onDeleteClick = async () => {
        try {
            console.log(postId);
            // postId를 사용하여 해당 포스트를 삭제
            await deletePost(postId);
            setShowAlert(true);
            onClose();
            getMemberPostData();
            console.log('Post deleted successfully:');
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };


    const items = [
        {
            label: '수정',
            key: '0',
            onClick: showModal,
        },
        {
            label: '삭제',
            key: '1',
            onClick: onDeleteClick,
        },
    ];


    return(
        <>
            <SuccessAlert visible={showAlert} onClose = {handleAlertClose}/>
            <Dropdown
                menu={{
                    items,
                }}
                trigger={['click']}
            >
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        <MoreOutlined style={{fontSize:"20px",color:"black"}} />
                    </Space>
                </a>
            </Dropdown>
            <InputModal visible={isModalOpen} onClose={handleCancel} isOk = {handleOk} post={post} getMemberPostData={getMemberPostData}/>
        </>

    )

}