import React, {useEffect, useState} from 'react';
import {deletePost, getLikeCount, getLikePostId, likePost} from "../api/PostApi";
import PostHeader from "../molecules/PostHeader";
import {Button, Image} from 'antd';
import {HeartOutlined} from '@ant-design/icons';
import ProfileBottom from "../molecules/ProfileBottom";
import Comment from "../organisms/Comment";
import {useNavigate} from "react-router-dom";
import InputModal from "../atoms/InputModal";
export default function SelectedPostTemplate({postData,fetchData}){
    const[like, setLike] = useState("")
    const [isHeartClick, setIstHeartClick] = useState(false);
    const member = localStorage.getItem('memberData');
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchLikeData = async () => {
        try {
            const data = await getLikeCount(postData.postId);
            setLike(data);
        } catch (error) {
            console.error('Error fetching post:', error);
        }
    };

    useEffect(() => {
        fetchLikeData();
    }, [like]);

    useEffect(() => {
        const fetchData = async () => {

            try {
                const data = await getLikePostId(postData.memberId);
                setIstHeartClick(data.includes(postData.postId));
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };
        fetchData();
    }, [postData.postId]);

    if (!postData) {
        return <div>Loading...</div>;

    }
    const handleClick = async () => {

        try {
            const response = await likePost({memberId:member,postId:postData.postId} );
            setIstHeartClick(true);
            fetchLikeData();


        } catch (error) {
            console.error('API 호출 실패:', error);
        }
    };
    console.log(postData.postId)

    const onDeleteClick = async () => {

        try {
            const response= await deletePost(postData.postId);
            navigate("/main");
            console.log(response)

            console.log('Post deleted successfully:');
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };








    return(
        <div style={{ display: 'flex', width: '80%' }}>
            {/* Sidebar */}
            <div
                style={{ width: '50px',
                    backgroundColor: '#FFFFFF',
                    padding: '30px',
                    fontSize:"50px",
                    flexDirection:"column" ,
                    display:"flex",
                    height:"100px",
                    justifyContent:"center",
                    alignItems: 'center',
                    position: "fixed",
                    borderRadius:"50px",
                    top: "40%"}}>
                <div style={{borderRadius:"50%",
                    backgroundColor:"#F8F9FA",
                    width:"80px",height:"80px",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isHeartClick ? 'red' : 'black'}}>
                    <HeartOutlined  onClick={handleClick}/>

                </div>


                <div style={{fontSize:"30px"}}>
                    {like}
                </div>

            </div>

            {/* Main Content */}
            <div style={{ flex: 1, padding: '20px',marginLeft: '140px' }}>
                <div style={{ display: 'flex' }}>
                    <PostHeader data={postData} />
                </div>
                <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center' }}>
                    <Image src={`http://localhost:8080/images/${postData.images[0]}`} />
                </div>
                <div style={{ fontSize: '30px', marginTop: '50px' }}>{postData.content}</div>
                {
                    member == postData.memberId ? (
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button onClick={showModal}>수정</Button>
                            <Button onClick={onDeleteClick}>삭제</Button>
                        </div>
                    ) : <></>
                }
                <InputModal visible={isModalOpen} isOk = {handleOk} post={postData}/>
                <ProfileBottom postData={postData}></ProfileBottom>
                <Comment postData={postData} fetchData={fetchData}/>


            </div>
        </div>
    );
}