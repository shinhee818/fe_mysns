import React, {useState} from 'react';
import { Button, Form, Input,Modal } from 'antd';
import {getMemberPost, updatePost} from "../api/PostApi";
const InputModal = ({visible,isOk,post,fetchData}) => {
    const [contentValue, setContentValue] = useState(post.content);
    const [titleValue, setTitleValue] = useState(post.title);

    const handleContentChange = (e) => {
        setContentValue(e.target.value);
    };
    const handleTitleChange = (e) => {
        setTitleValue(e.target.value);
    };
    const updateClick = async () => {
        try {
            await updatePost(post.postId, { content: contentValue, title:titleValue});
            fetchData();
            isOk();
        } catch (error) {
        }
    };

    return (
        <>
            <Modal title="게시물 수정" open={visible} onOk={isOk} >
                <Form
                    name="wrap"
                    labelCol={{
                        flex: '110px',
                    }}
                    labelAlign="left"
                    labelWrap
                    wrapperCol={{
                        flex: 1,
                    }}
                    colon={false}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{ content: post.content }}

                >
                    <Form.Item
                        label="title"
                        name="title"
                        rules={[
                            {
                                required: true,
                                message : 'title은 필수입니다.'
                            },
                        ]}
                    >
                        <Input onChange={handleTitleChange}/>
                    </Form.Item>
                    <Form.Item
                        label="content"
                        name="content"
                        rules={[
                            {
                                required: true,
                                message : 'content는 필수입니다.'
                            },
                        ]}
                    >
                        <Input onChange={handleContentChange}/>
                    </Form.Item>

                    <Form.Item label=" ">
                        <Button type="primary" htmlType="submit" onClick={updateClick}>
                            수정
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>

    )

}



export default InputModal;