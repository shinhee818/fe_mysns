import {Button, Input} from 'antd';
import {useState} from "react";
import CommentList from "../molecules/CommentList";
import {createComment, getComment} from "../api/CommentApi";
const { TextArea } = Input;

export default function Comment({postData}){
    const [value, setValue] = useState('');
    const memberId = localStorage.getItem('memberData');
    const [comment,setComment] = useState([]);
    const commentClick = async () => {
        try {
            const response = await createComment({comment:value,postId:postData.postId,memberId:memberId} );
            console.log('API 호출 성공:', response);
            fetchCommentData();
            setValue("");
        } catch (error) {
        }
    };

    const fetchCommentData = async () => {
        try {
            const data = await getComment(postData.postId);
            setComment(data.Comments);
        } catch (error) {
        }
    };



    return(
        <>
            <h1>
                댓글
            </h1>
            <div
                style={{
                    margin: '24px 0',
                }}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <TextArea
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="댓글을 작성하세요"
                    style={{
                        height: 200,
                        marginBottom: '12px',
                    }}
                />
                <Button type="primary" style={{ alignSelf: 'flex-end',backgroundColor:"#9BBCD9" }} onClick={commentClick}>댓글 작성</Button>
                <CommentList postData={postData} fetchCommentData={fetchCommentData} comment={comment}/>
            </div>
        </>

    )
}