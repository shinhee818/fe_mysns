import React from "react";
import authInstance from "./utils/authInstance";
import {message} from "antd";



export const getPosts = async (page,sort,category) => {
    try{
        const response = await authInstance.get(`/api/post/search?page=${page}&sort=${sort}&category=${category}`);
        return response.data;
    }catch (error){
        message.error(error.response.data.errorMessage)
        throw error;
    }
}

export const getPost = async (postId) => {
    try{
        const response = await authInstance.get(`/api/post/search/${postId}`);
        return response.data;
    }catch (error){
        message.error(error.response.data.errorMessage)
        throw error;
    }

}

export const getMemberPost = async (page) => {
    try{
        const response = await authInstance.get(`/api/my-post/search?page=${page}`);
        return response.data;
    }catch (error){
        message.error(error.response.data.errorMessage)
        throw error;
    }
}



export const createPost = async (createPostData) => {
    try{
        const response = await authInstance.post(`/api/post`,createPostData);
        return response.data;
    }catch (error){
        message.error(error.response.data.errorMessage)
        throw error;
    }
}



export const deletePost = async (postId) => {
    try{
        const response = await authInstance.delete(`/api/post/${postId}`);

        return response.data;
    }catch (error){
        message.error(error.response.data.errorMessage)
        throw error;
    }
}

export const updatePost = async (postId, updatedData) => {
    try{
        const response = await authInstance.put(`/api/post/${postId}`, updatedData);

        return response.data;
    }catch (error){
        message.error(error.response.data.errorMessage)
        throw error;
    }
}

export const likePost = async (likeRequest) => {
    try {
        const response = await authInstance.post('/api/like', likeRequest);

        return response.data;
    } catch (error) {
        message.error(error.response.data.errorMessage)
        throw error;
    }
};

export const getLikePostId = async (memberId) => {
    try {
        const response = await authInstance.get(`/api/like/member/${memberId}` );
        return response.data;
    } catch (error) {
        message.error(error.response.data.errorMessage)
        throw error;
    }
};

export const getLikeCount = async (postId) => {
    try {
        const response = await authInstance.get(`/api/like/${postId}` );
        return response.data;
    } catch (error) {
        message.error(error.response.data.errorMessage)
        throw error;
    }

}


