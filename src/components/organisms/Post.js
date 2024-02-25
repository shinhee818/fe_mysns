import ProfileHeader from "../molecules/ProfileHeader";
import {Card, Col, Modal, Row, Pagination, message, Select} from 'antd';
import {useEffect, useState} from "react";
import "../atoms/PostBottom.css";
import {HeartOutlined} from "@ant-design/icons";
import noimg from "../media/noimage.gif"
import {usePostContext} from "../api/context/PostContext";
import { useNavigate } from 'react-router-dom';

function Post({getPostData,current,setCurrent,handleChange,selectedCategory}){
    const{postData} = usePostContext();
    const [open, setOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const navigate = useNavigate();
    const { Option } = Select;
    const member = localStorage.getItem('memberData');

    const handleChangeInternal = async (value) => {
        handleChange(value);
    };

    const { Meta } = Card;


    const handleColClick = (post) => {
        if (!member) {
            message.info('로그인 후에 이용할 수 있습니다.');
            return;
        }
        navigate(`/post/${post.postId}`);
        setSelectedPost(post);
        setOpen(true);
    };

    const onChange = (page) => {
        setCurrent(page);
    };

    useEffect(() => {
        getPostData();
    }, [current,selectedCategory]);

    return(
        <>
            <>
                <Select
                    defaultValue="ALL"
                    style={{
                        width: 120,
                    }}
                    onChange={handleChangeInternal}
                    options={[
                        {
                            value: "",
                            label: 'ALL',
                        },
                        {
                            value: 'BACKEND',
                            label: 'BACKEND',
                        },
                        {
                            value: 'FRONTEND',
                            label: 'FRONTEND',
                        },

                    ]}
                />
                <Row gutter={[32,16]} >
                    {postData &&
                        postData.findPosts &&
                        postData.findPosts.map(post => (
                        <Col span={6}className="hoverable-col"onClick={() => handleColClick(post)}>


                            <Card
                                style={{ width: 420}}
                                cover={
                                    post.imageUrl === null || post.imageUrl === "" ?  (
                                        <img alt="example" src={noimg}
                                             style={{ width: "100%", height: "250px", objectFit: "cover" }}/>
                                    ):
                                        (
                                            <img alt="example" src={`http://localhost:8080/images/${post.imageUrl}`}
                                                 style={{ width: "100%", height: "250px", objectFit: "cover" }}/>
                                        )
                                }
                                actions={[
                                    <Row>
                                        <Col span={12}> <ProfileHeader postData={post}/></Col>
                                        <Col span={12} style={{textAlign:"right",paddingRight:"20px"}}><HeartOutlined style={{padding:"5px"}}/>{post.likeCount}</Col>
                                    </Row>


                                ]}
                            >
                                <Meta
                                    title={post.title}
                                    description={post.content}
                                />
                            </Card>

                        </Col>
                    ))}

                </Row>
            </>

            <Pagination current={current} onChange={onChange} total={postData.totalElements} style={{width:"100%",marginTop:"10px",textAlign:"center"}}/>
        </>



    )
}

export default Post;