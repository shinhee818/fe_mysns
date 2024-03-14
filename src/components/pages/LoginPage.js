import React, {useState} from 'react';
import {LoadingOutlined, MailOutlined, PlusOutlined, UserOutlined} from '@ant-design/icons';
import {Alert, Button, Checkbox, Form, Input, message, Modal, Upload} from 'antd';
import {useNavigate} from "react-router-dom";
import {useMemberContext} from "../api/context/MemberContext";
import {createMember, loginMember} from "../api/MemberApi";

export default function LoginPage(){
    const[join,setJoin] = useState(false)
    const [url,setImageUrl] = useState("");
    const [file, setFile] = useState(null);
    const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);
    const [modal, contextHolder] = Modal.useModal();
    const navigate = useNavigate();
    const{updateMemberData} = useMemberContext();
    const [loading, setLoading] = useState(false);
    const { TextArea } = Input;

    const showLoginSuccessModal = () => {
        const secondsToGo = 3;
        const instance = modal.success({
            title: 'Login Successful'
        });

        setTimeout(() => {
            instance.destroy();
        }, secondsToGo * 1000);
    };

    const [formData, setFormData] = useState({
        memberName: '',
        age: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [loginFormData, setLoginFormData] = useState({
        email: '',
        password: ''
    });

    const handleCancel = () => {
        setFormData({
            memberName: '',
            age: '',
            email: '',
            password: '',
            confirmPassword: '',
            url: '',
        });
        setLoginFormData({
            email: '',
            password: '',
        });
        setImageUrl('');
        setFile(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleLoginInputChange = (e) => {
        const { name, value } = e.target;
        setLoginFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await createMember(formData)
            message.success('회원가입 되었습니다.');
            handleCancel();
        } catch (error) {

        }
    };

    const handleLoginSubmit = async () => {
        try {
            const response = await loginMember(loginFormData)
            localStorage.setItem('memberData', response.memberId);
            updateMemberData(response);

            showLoginSuccessModal();
            navigate("/main")


        } catch (error) {
        }
    };
    const onJoin = () => {
        setJoin(!join);
    }

    const handleChange = async (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            const serverResponse = info.file.response;


            setLoading(false);

            setImageUrl(serverResponse);

            setFormData((prevData) => ({
                ...prevData,
                url: serverResponse,
            }));

        }else if(info.file.status === 'error') {
            setLoading(false);
        }
    }

    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );
    return (
        <div  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
            <div style={{  display: 'flex', flexDirection: 'column',width:"70%"}}>
                <div style={{ fontSize: '50px', margin: '20px' }}>{!join ? '로그인' : '회원가입'}</div>

                {
                    join?(<div style={{width:"95%",display:"flex", flexDirection: 'column'}}>
                            <TextArea style={{ margin: '10px' }}
                                   placeholder="이름"
                                   name="memberName"
                                   autoSize={{ minRows: 2}}
                                   value={formData.memberName}
                                   onChange={handleInputChange} />
                            <TextArea style={{ margin: '10px' }}
                                   placeholder="나이"
                                   name="age"
                                   autoSize={{ minRows: 2}}
                                   value={formData.age}
                                   onChange={handleInputChange}/>
                            <TextArea style={{ margin: '10px' }}
                                   placeholder="이메일"
                                   name="email"
                                   autoSize={{ minRows: 2}}
                                   value={formData.email}
                                   onChange={handleInputChange}/>
                            <TextArea style={{ margin: '10px' }}
                                   placeholder="비밀번호"
                                   type="password"
                                   name="password"
                                   autoSize={{ minRows: 2}}
                                   value={formData.password}
                                   onChange={handleInputChange}/>
                            <TextArea style={{ margin: '10px' }}
                                   placeholder="비밀번호 확인"
                                   type="password"
                                   name="confirmPassword"
                                   autoSize={{ minRows: 2}}
                                   value={formData.confirmPassword}
                                   onChange={handleInputChange}/>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Upload
                                    name="file"
                                    listType="picture-card"
                                    className="file-uploader"
                                    showUploadList={false}
                                    action="http://localhost:8080/api/image/post"
                                    onChange={handleChange}
                                >
                                    {url ? (
                                        <img
                                            src={`http://localhost:8080/images/${url}`}
                                            alt="file"
                                            style={{
                                                width: '100%',
                                            }}
                                        />
                                    ) : (
                                        uploadButton
                                    )}
                                </Upload>
                            </div>

                            <Button type="primary" style={{backgroundColor:"black", alignSelf: "flex-end" }} onClick={handleSubmit}>
                                회원가입
                            </Button>
                            {isSignUpSuccess && (
                                <Alert message="Success Tips" type="success" showIcon />
                            )}
                        </div>

                    ):<div style={{width:"95%",display:"flex", flexDirection: 'column'}}>
                        <TextArea style={{ margin: '10px' }}
                               placeholder="이메일"
                               name="email"
                               autoSize={{ minRows: 2}}
                               value={loginFormData.email}
                               onChange={handleLoginInputChange}/>
                        <TextArea style={{ margin: '10px' }}
                               placeholder="비밀번호"
                               type="password"
                               name="password"
                               autoSize={{ minRows: 2}}
                               value={loginFormData.password}
                               onChange={handleLoginInputChange}/>
                        <Button type="primary" style={{backgroundColor:"black", alignSelf: "flex-end",width:"100px",height:"80px",fontSize:"25px" }} onClick={handleLoginSubmit}>
                            로그인
                        </Button>
                        <>
                            {contextHolder}
                        </>

                    </div>
                }
            </div>

            <div style={{ justifyContent: 'right', display: 'flex', margin: '10px',marginTop:"50px",fontSize:"30px" }}>
                {!join ? '아직 회원이 아니신가요?' : '이미 회원이신가요?'}
                <div style={{ marginLeft: '10px', cursor:"pointer"}} onClick={onJoin}>
                    {!join ? '회원가입' : '로그인'}
                </div>
            </div>
        </div>
    );
}