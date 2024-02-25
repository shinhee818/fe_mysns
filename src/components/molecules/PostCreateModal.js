import React, {useState} from 'react';
import {Modal,message,Button,Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import "./ImageUpload.css"
import {
    Form,
    Input,
} from 'antd';
import {createPost} from "../api/PostApi";
import {usePostContext} from "../api/context/PostContext";
const { TextArea } = Input;

export default function PostCreateModal({open,onCancel,getPostData,getPostRecentData}){
    const {updatePostData} = usePostContext();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const[tag,setTag] = useState(null);
    const [imageUrl,setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false);


    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            const serverResponse = info.file.response;
            setLoading(false);
            setImageUrl(serverResponse);
        } else if (info.file.status === 'error') {
            setLoading(false);

        }
    };

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


    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };
    const handleContentChange = (e) => {
        setContent(e.target.value);
    };
    const handleTagChange = (e) => {
        setTag(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            const tagListArray = tag ? (tag.split(',').map(tag => tag.trim())) : null;

            const createPostData = {
                title: title,
                content: content,
                memberId : 1,
                tagList: tagListArray,
                postImages:[
                    {url:imageUrl,postImageOrder:1}
                ]
            };
            await createPost(createPostData);
            updatePostData(createPostData);

            message.success('성공적으로 생성되었습니다.');
            getPostData();
            getPostRecentData();

            onCancel();

        } catch (error) {
        }
    };
    return(
        <>
            <Modal
                destroyOnClose={true}
                title="포스트 추가"
                centered
                open={open}
                onCancel={onCancel}
                width="1000px"
                footer={null}
            >
                    <Form.Item label="title" name = "title" required={true}>
                        <Input onChange={handleTitleChange}/>
                    </Form.Item>
                    <Form.Item label="content" name="content" required={true}>
                        <TextArea rows={12} onChange={handleContentChange}/>
                    </Form.Item>
                    <Form.Item label="tag" name="tag">
                        <Input onChange={handleTagChange}/>
                    </Form.Item>
                    <Form.Item>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            {/*<input type="file" id="file" onChange={handleChangeFile} multiple="multiple"></input>*/}
                            {/*<Button style = {{ borderRadius: "10px"}} onClick={()=> send()}>올리기</Button>*/}
                            <Upload
                                name="file"
                                listType="picture-card"
                                className="file-uploader"
                                showUploadList={false}
                                action="http://localhost:8080/api/image/post"
                                onChange={handleChange}
                            >
                                {imageUrl? (
                                    <img
                                        src={`http://localhost:8080/images/${imageUrl}`}
                                        alt="avatar"
                                        style={{
                                            width: '100%',
                                        }}
                                    />
                                ) : (
                                    uploadButton
                                )}
                            </Upload>
                        </div>

                    </Form.Item>
                <div style={{display:"flex",justifyContent: 'flex-end'}}>
                    <Button style = {{ borderRadius: "10px",backgroundColor:"black",color:"white"}} onClick={handleSubmit}>추가</Button>
                </div>

            </Modal>
        </>


    )
}