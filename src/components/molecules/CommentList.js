import {deleteComment, updateComment} from "../api/CommentApi";
import React, {useEffect, useState} from "react";
import {Button, Col, Input, message, Row} from "antd";
import {MyImg} from "../atoms/PostAtom";
import my from "../media/profile.png";


export default function CommentList({fetchCommentData,comment}){
    const memberId = localStorage.getItem('memberData');

    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedComment, setEditedComment] = useState("");

    const startEditing = (commentId, initialComment) => {
        setEditingCommentId(commentId);
        setEditedComment(initialComment);
    };

    const cancelEditing = () => {
        setEditingCommentId(null);
        setEditedComment("");
    };

    const saveEditedComment = async (commentId) => {
        try {
            await updateComment(commentId, { comment: editedComment,memberId:memberId});
            message.success("댓글이 수정되었습니다.");
            fetchCommentData();
            setEditingCommentId(null);
            setEditedComment("");
        } catch (error) {
            console.error("댓글 수정 실패:", error);
        }
    };





    useEffect(() => {
        fetchCommentData();
    }, []);

    const deleteCommentClick = async (commentId,memberId) => {

        try {
            const response = await deleteComment(commentId,memberId);
            message.success('삭제되었습니다.');

            fetchCommentData()
            console.log('API 호출 성공:', response);
        } catch (error) {
        }
    };
    return(<>
            {comment && comment.length > 0 && comment.map((i) => (
                <Row key={i.commentId}>
                    <Col span={24} >
                        <div style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                            <div style={{ display: "flex", alignItems: 'center' }}>
                                <MyImg style={{ margin: "15px", width: "50px", height: "50px" }} imageUrl={(i && i.url) ? `http://localhost:8080/images/${i.url}` : my} />
                                <div style={{ marginLeft: '10px' }}>
                                    <div style={{ fontSize: "20px", fontWeight: "bolder" }}>
                                        {(i && i.memberName) ? i.memberName : "member"}
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div style={{ fontSize: "20px", marginRight: '20px', marginBottom: '10px',justifyContent: 'space-between' }}>
                            {editingCommentId === i.commentId ? (
                                <Input
                                    value={editedComment}
                                    onChange={(e) => setEditedComment(e.target.value)}
                                />
                            ) : (
                                i.comment
                            )}
                            <div style={{ display: "flex", justifyContent: 'flex-end', alignItems: 'center' }}>
                                {editingCommentId !== i.commentId ? (
                                    <>
                                        <Button onClick={() => deleteCommentClick(i.commentId,memberId)}>삭제</Button>
                                        <Button onClick={() => startEditing(i.commentId, i.comment)}>수정</Button>
                                    </>
                                ) : (
                                    <>
                                        <Button onClick={() => cancelEditing()}>취소</Button>
                                        <Button onClick={() => saveEditedComment(i.commentId)}>저장</Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </Col>
                </Row>
            ))}
        </>

    )
}