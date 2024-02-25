import React, {useState} from 'react';
import { Button, Form, Input,Modal } from 'antd';
import {getMemberPost, updatePost} from "../api/PostApi";
const InputModal = ({visible,isOk,post,fetchData}) => {
    const [contentValue, setContentValue] = useState(post.content);
    const [titleValue, setTitleValue] = useState(post.title);

    const handleContentChange = (e) => {
        setContentValue(e.target.value);
        console.log(contentValue);
    };
    const handleTitleChange = (e) => {
        setTitleValue(e.target.value);
        console.log(titleValue);
    };
    const updateClick = async () => {
        try {
            // 새로운 내용과 함께 게시물을 업데이트하는 API를 호출합니다.
            await updatePost(post.postId, { content: contentValue, title:titleValue});
            fetchData();
            isOk();
        } catch (error) {
            console.error('게시물 업데이트 중 오류 발생:', error);
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