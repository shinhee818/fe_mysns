import React from 'react';
import { MailOutlined , UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';

export default function LoginPage(){
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };
    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            style={{marginTop:"50px"}}
            onFinish={onFinish}
            size = "large"
        >
            <Form.Item
                name="memberName"
                size = "large"

                rules={[
                    {
                        required: true,
                        message: '이름을 입력해주세요!',
                    },
                ]}
            >
                <Input size = "large" style={{height:"80px"}}
                       prefix={<UserOutlined className="site-form-item-icon" />}
                       placeholder="이름을 입력해주세요!" />
            </Form.Item>
            <Form.Item
                name="e-mail"
                rules={[
                    {
                        required: true,
                        message: '이메일을 입력해주세요!',
                    },
                ]}
            >
                <Input
                    prefix={<MailOutlined className="site-form-item-icon" />}
                    type="email"
                    placeholder="이메일을 입력해주세요"
                    size = "large" style={{height:"80px"}}
                />
            </Form.Item>

            <Form.Item  >
                <Button type="primary" style={{backgroundColor:"black", marginRight:"10px"}} >
                    Log in
                </Button>
                Or <a style={{color:"black"}} href="">register now!</a>
            </Form.Item>
        </Form>
    );
}