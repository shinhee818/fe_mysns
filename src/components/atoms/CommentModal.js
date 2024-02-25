import React, {useState} from 'react';
import { Form, Input,Modal } from 'antd';
import {updateComment} from "../api/CommentApi";
const CommentModal = ({visible,onClose,comment,getComment}) => {
    const [contentValue, setContentValue] = useState(comment.content);
    const memberId = localStorage.getItem('memberData');


    const handleCommentChange = (e) => {
        setContentValue(e.target.value);
    };
    const updateClick = async () => {
        try {
            await updateComment(comment.commentId, { comment: contentValue,memberId:memberId });
            getComment();
            onClose();
        } catch (error) {

        }
    };



    return (
        <>
            <Modal title="댓글 수정" open={visible} onOk={updateClick} onCancel={onClose}>
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
                    initialValues={{ content: comment.content }}

                >
                    <Form.Item
                        label="content"
                        name="content"
                        rules={[
                            {
                                required: true,
                                message : 'comment는 필수입니다.'
                            },
                        ]}
                    >
                        <Input onChange={handleCommentChange}/>
                    </Form.Item>

                    {/*<Form.Item label=" ">*/}
                    {/*    <Button type="primary" htmlType="submit" onClick={updateClick}>*/}
                    {/*        수정*/}
                    {/*    </Button>*/}
                    {/*</Form.Item>*/}
                </Form>
            </Modal>
        </>

    )

}



export default CommentModal;