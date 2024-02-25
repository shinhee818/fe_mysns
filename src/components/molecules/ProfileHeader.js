import {MyImg, HorizonCon, NickName} from "../atoms/PostAtom";
import { Col, Row, } from 'antd';
import {useEffect, useState} from "react";
import {getMember} from "../api/MemberApi";
import my from "../media/profile.png";
function ProfileHeader({postData}){


    return(

            <Row style={{marginLeft:"25px"}}>
                <Col span={12}>
                    <HorizonCon key={postData.postId}>
                        <MyImg imageUrl = {postData.url?`http://localhost:8080/images/${postData.url}`: my}/>
                        <NickName>{postData.memberName}</NickName>
                    </HorizonCon>

                </Col>

            </Row>


    )
}

export default ProfileHeader;