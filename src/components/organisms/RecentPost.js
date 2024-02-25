import ProfileHeader from "../molecules/ProfileHeader";
import {Card, Col, Modal, Row, Pagination, Select} from 'antd';
import {useEffect, useState} from "react";
import "../atoms/PostBottom.css";
import {HeartOutlined} from "@ant-design/icons";
import noimg from "../media/noimage.gif"
import {useRecnetPostContext} from "../api/context/RecentPostContext";
import {useNavigate} from "react-router-dom";

function RecentPost({getPostData,current,setCurrent,handleRecentChange,selectedCategory}){
    const{recentPostData} = useRecnetPostContext();
    const [open, setOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const { Meta } = Card;
    const navigate = useNavigate();

    const handleChangeInternal = (value) => {
        console.log(value);
        handleRecentChange(value);
        getPostData();
    };



    const onChange = (page) => {
        console.log(page);
        setCurrent(page);
    };
    const handleColClick = (post) => {
        console.log(post)
        navigate(`/post/${post.postId}`)

        setSelectedPost(post);
        setOpen(true);
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
                    {recentPostData &&
                        recentPostData.findPosts &&
                        recentPostData.findPosts.map(post => (
                        <Col span={6}className="hoverable-col"onClick={() => handleColClick(post)}>


                            <Card
                                style={{ width: 420}}
                                cover={
                                    post.imageUrl === null || post.imageUrl === ""  ?  (
                                        <img alt="example" src={noimg}
                                             style={{ width: "100%", height: "250px", objectFit: "cover" }}/>)
                                        :(
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

            <Pagination current={current} onChange={onChange} total={recentPostData.totalElements} style={{width:"100%",marginTop:"10px",textAlign:"center"}}/>
        </>



    )
}

export default RecentPost;