import authInstance from "./utils/authInstance";
import {message} from "antd";

export const createComment = async (createCommentData) => {
    try{
        const response = await authInstance.post(`/api/comment`,createCommentData);
        return response.data;

    }catch (error){
        message.error(error.response.data.errorMessage)
        throw error;
    }
}

export const getComment = async (postId) => {
    try{
        const response = await authInstance.get(`/api/comment/${postId}`);
        return response.data;
    }catch (error){
        message.error(error.response.data.errorMessage)
        throw error;
    }
}


export const updateComment = async (commentId,updatedComment) => {
    try{
        const response = await authInstance.put(`/api/comment/${commentId}`,updatedComment);
        return response.data;
    }catch (error){
        message.error(error.response.data.errorMessage)
        throw error;
    }
}

export const deleteComment = async (commentId,memberId) => {
    try{
        const response = await authInstance.delete(`/api/comment/${commentId}/${memberId}`);
        return response.data;
    }catch (error){
        message.error(error.response.data.errorMessage)
        throw error;
    }
}