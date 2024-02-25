import React, {useEffect, useState} from 'react';
import { Image, Card, Flex, Typography,Button,Input,Form } from 'antd';
import { Col, Row  } from 'antd';
import {getMember, updateMember} from "../api/MemberApi";
import MainHeader from "../organisms/MainHeader";
import my from "../media/profile.png";

const cardStyle = {
    width:"70%",
    backgroundColor: "#F8F9FA",
    border:"none",

};

export function MyProfile({member}){
    const [editMode, setEditMode] = useState(false);
    const [editedName, setEditedName] = useState("");
    const [editedAge, setEditedAge] = useState("");
    const [memberData,setMember] = useState("")
    const fetchMemberData = async () => {
        try {
            const data = await getMember(member.memberId);
            setMember(data)
        } catch (error) {
        }
    };





    useEffect(() => {
        fetchMemberData();
    },[editMode])

    const handleSaveClick = async () => {
        try {
            setEditMode(false);
            await updateMember(member.memberId, {memberName : editedName,age:editedAge});
            fetchMemberData();

        } catch (error) {
        }
    };
    const handleEditClick = () => {
        setEditMode(true);
    }



    return(
        <>
        <MainHeader/>
            <div style={{ justifyContent:"center",
                alignItems: "center",
                display:"flex",
                flexDirection: "column"}}>
                <Card style={cardStyle} >
                    <Flex>
                        {(member.url) ? (
                            <Image
                                width={200}
                                style={{borderRadius:"50%", height:"200px"}}
                                src={`http://localhost:8080/images/${member.url}`}
                            />

                        ):(
                            <Image
                                width={200}
                                style={{borderRadius:"50%",height:"200px"}}
                                src={my}
                            />

                        ) }

                        <Flex vertical align="flex-start" style={{ padding: 30,justifyContent:"center" }}>
                            {editMode ? (
                                    <Form.Item name="Input" rules={[{ required: true, message: '이름을 입력해주세요!' }]}>
                                        <Input size="large" value={editedName} onChange={(e) => setEditedName(e.target.value)} />
                                    </Form.Item>

                            ) : (
                                <Typography.Title>
                                    {memberData?memberData.memberName:member.memberName}
                                </Typography.Title>
                            )}
                        </Flex>


                    </Flex>
                    <Row style={{marginTop:"30px"}}>
                        <Col span={18} push={7} style={{fontSize:"20px",marginTop:"35px"}}>
                            {member.email}
                        </Col>
                        <Col span={6} pull={18} style={{fontSize:"25px"}}>
                            <h3>
                                이메일 주소
                            </h3>
                        </Col>
                        <Col span={18} push={7} style={{marginTop:"35px", fontSize:"20px"}}>
                            {editMode ? (
                                <Form.Item name="Input" rules={[{ required: true, message: '나이를 입력해주세요!' }]}>
                                    <Input size="large" value={editedAge} onChange={(e) => setEditedAge(e.target.value)} />
                                </Form.Item>

                            ) : (
                                <>
                                    {memberData?memberData.age:member.age}
                                </>

                            )}
                        </Col>
                        <Col span={6} pull={18} style={{fontSize:"25px"}}>
                            <h3>
                                나이
                            </h3>
                        </Col>
                    </Row>
                    {editMode?(
                        <Button type="primary"
                                onClick={handleSaveClick}
                                style={{ position: 'absolute', bottom: 5, right: 5, backgroundColor:"black",borderRadius: "20px",height:"40px" }}>
                            저장
                        </Button>
                    ):(
                        <Button type="primary"
                                onClick={handleEditClick}
                                style={{ position: 'absolute', bottom: 5, right: 5, backgroundColor:"black",borderRadius: "20px",height:"40px"}}>
                            수정
                        </Button>
                    )}


                </Card>
            </div>
        </>

    )
}