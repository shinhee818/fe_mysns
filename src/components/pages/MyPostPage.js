import React, {useEffect, useState} from 'react';
import {getMember} from "../api/MemberApi";
import { Layout, Flex } from 'antd';
import {MyImg} from "../atoms/PostAtom";
import MyPosts from "../templates/MyPosts";
import MainHeader from "../organisms/MainHeader";
import {useLocation} from "react-router-dom";
import my from "../media/profile.png";

export function MyPostPage(){
    const { Header, Content } = Layout;
    const location = useLocation();
    const member = location.state.key;

    const headerStyle = {
        textAlign: 'center',
        width:"100%",
        height: "30%",
        paddingInline: 48,
        backgroundColor: 'white',
        padding:"15px",
        display:"flex",
        borderBottom:"1px #EEF0F3 solid"
    };
    const contentStyle = {
        minHeight: "70%",
        backgroundColor: 'white',
        padding:"30px",
        overflowY: "auto"
    };
    const layoutStyle = {
        margin:"150px",
        borderRadius: 8,
        overflow: 'hidden',
        height:"1000px",
    };



    return (
        <div style={{width:"100%",paddingBottom:"10px",paddingTop:"50px" }}>
            <MainHeader/>
                <Flex gap="middle" wrap="wrap">
                    <Layout style={layoutStyle}>
                        <Header style={headerStyle}>
                            <MyImg imageUrl = {member.url?`http://localhost:8080/images/${member.url}`: my} style={{width:"200px",height:"200px"}}/>
                            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                <div style={{ fontSize:"100px" }}>{member.memberName}</div>
                            </div>
                        </Header>
                        <Content style={contentStyle}>
                            <div style={{textAlign:"center",fontSize:"50px"}}>내 포스트</div>
                            <MyPosts member={member}/>
                        </Content>
                    </Layout>
                </Flex>

        </div>


    );
};