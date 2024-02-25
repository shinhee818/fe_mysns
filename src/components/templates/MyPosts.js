import React, {useEffect, useState} from "react";
import {getMemberPost} from "../api/PostApi";
import {Card, Col, Modal, Pagination, Row} from "antd";
import ProfileHeader from "../molecules/ProfileHeader";
import {HeartOutlined} from "@ant-design/icons";
import noImg from "../media/noimage.gif";
import {useNavigate} from "react-router-dom";

export default function MyPosts(){
    const [postData, setPostData] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [current, setCurrent] = useState(1);
    const { Meta } = Card;
    const navigate = useNavigate();
    const onChange = (page) => {
        console.log(page);
        setCurrent(page);
    };
    const onClose=()=>{
        setOpen(false)
    }
    const handleColClick = (post) => {
        console.log(post)
        navigate(`/post/${post.postId}`)

        setSelectedPost(post);
        setOpen(true);
    };

    const getMemberPostData = async () => {
        try {
            const data = await getMemberPost(current - 1);
            setPostData(data);
        } catch (error) {
            console.error('Error fetching post:', error);
        }
    };

    useEffect(() => {
        getMemberPostData();
    },[current]);

    return(
        <>
            <>
                <Row gutter={16} >
                    {postData &&
                        postData.findPosts &&
                        postData.findPosts.map(post => (
                        <Col span={8}className="hoverable-col"onClick={() => handleColClick(post)}>
                            <Card
                                style={{ width: 420 }}
                                cover={
                                    post.imageUrl ? (
                                        <img alt="example" src={`http://localhost:8080/images/${post.imageUrl}`}
                                             style={{ width: "100%", height: "350px", objectFit: "cover" }}/>
                                    ) : (
                                        <img alt="example" src={noImg}
                                             style={{ width: "100%", height: "500px", objectFit: "cover" }}/>
                                    )
                                }
                                actions={[
                                    <Row>
                                        <Col span={12}> <ProfileHeader postData={post}/></Col>
                                        <Col span={12} style={{textAlign:"right",paddingRight:"20px"}}><HeartOutlined /></Col>
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
            <Pagination current={current} onChange={onChange} total={postData.totalPages} style={{width:"100%",bottom:"100px",textAlign:"right"}}/>
        </>



    )
}