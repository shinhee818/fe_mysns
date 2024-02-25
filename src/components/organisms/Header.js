import {SearchOutlined ,BellOutlined} from '@ant-design/icons'
import {Button, Col, Row} from 'antd';
import React, {useEffect, useState} from "react";
import {getMember} from "../api/MemberApi";
import {useNavigate} from "react-router-dom";
import LoginModal from "../molecules/LoginModal";
import {useMemberContext} from "../api/context/MemberContext";

function Header(){

    const [loginOpen, setLoginOpen] = useState(false);
    const navigate = useNavigate();

    const showLoginModal = () => {
        setLoginOpen(true);
    };


    const handleLoginCancel = (e) => {
        setLoginOpen(false);
    };


    const onLogoClick=()=>{
        navigate("/")
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
                                style={{ borderRadius: "20px",height:"40px",backgroundColor:"black", fontWeight:"bold",color:"white",borderColor:"black"}}
                                onClick={showLoginModal}>
                            로그인

                        </Button>
                        <LoginModal open={loginOpen}
                                    onCancel={handleLoginCancel}/>


                    </div>

                </Col>
            </Row>
        </div>

    )

}
export default Header;