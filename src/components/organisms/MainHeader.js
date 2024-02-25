import {SearchOutlined ,BellOutlined} from '@ant-design/icons'
import {Button, Col, Row,Dropdown} from 'antd';
import {MyImg} from "../atoms/PostAtom";
import React, {useEffect, useState} from "react";
import {getMember} from "../api/MemberApi";
import PostCreateModal from "../molecules/PostCreateModal";
import {useNavigate} from "react-router-dom";
import {useMemberContext} from "../api/context/MemberContext";
import MyProfilePage from "../pages/MyProfilePage";
import my from "../media/profile.png";

function MainHeader({getPostData,getPostRecentData}){
    const [member,setMember] = useState("");
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();


    const onLogOut = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('memberData');
        navigate('/')
    }
    const items = [
        {
            key: '1',
            label: (
                <a onClick={() => navigate('/profile',{state:{key : member}})}>
                프로필 보기
            </a>
            ),
        },
        {
            key: '2',
            label: (<a onClick={()=> navigate('/mypost',{state:{key:member}})}> 내 게시물 모아보기</a>)
        },
        {
            key: '3',
            label: (<a onClick={onLogOut}> 로그아웃하기</a>)
        },

    ];

    const showModal = () => {
        setOpen(true);
    };
    const handleCancel = (e) => {
        setOpen(false);
    };

    useEffect(() => {
        const memberId = localStorage.getItem('memberData');
        const fetchData = async () => {
            try {
                const data = await getMember(memberId);
                setMember(data);
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };
        fetchData();
    },[])



    const onLogoClick=()=>{
        navigate("/main")
    };

    return(
        <div style={{marginBottom:"15px"}}>
            <Row>
                <Col span={12}>
                    <div style={{fontSize:"40px",cursor:"pointer"}} onClick={onLogoClick}>
                        Heelog
                    </div>
                </Col>
                <Col span={12} style={{textAlign:"right"}}>
                    <div style={{display:"flex",alignItems:"center",justifyContent: "flex-end"}}>
                        <BellOutlined style={{fontSize:"35px", margin:"10px"}}/>
                        <SearchOutlined style={{fontSize:"35px", margin:"10px"}}/>
                        <Button type="primary"
                                style={{ borderRadius: "20px",height:"40px",backgroundColor:"white", fontWeight:"bold",color:"black",borderColor:"black"}}
                                onClick={showModal}>
                            새 글 작성
                        </Button>
                        <PostCreateModal open={open}
                                         onCancel={handleCancel} getPostData={getPostData} getPostRecentData={getPostRecentData}/>
                        <Dropdown
                            menu={{
                                items,
                            }}
                            placement="topRight"
                        >
                            <MyImg style={{margin:"15px"}} imageUrl = {member.url?`http://localhost:8080/images/${member.url}`: my} />
                        </Dropdown>
                    </div>

                </Col>
            </Row>
        </div>

    )

}
export default MainHeader;