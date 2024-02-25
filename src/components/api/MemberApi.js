import axios from 'axios';
import defaultInstance from "./utils/defaultInstance";
import authInstance from "./utils/authInstance";
import {message} from "antd";




export const createMember = async (createdData) => {
    try{
        const response = await defaultInstance.post(`/signup`,createdData);
        return response.data;
    }catch (error){
        message.error(error.response.data.errorMessage)
        throw error;
    }
}
export const loginMember = async (loginData) => {
    try {
        const response = await defaultInstance.post(`/login`, loginData);
        localStorage.setItem('accessToken',response.data.accessToken);
        return response.data;
    } catch (error) {
        message.error(error.response.data.errorMessage)
        throw error;
    }
};

export const getMember = async (memberId) => {
    try{
        const response = await authInstance.get(`api/member/${memberId}`);

        return response.data;
    }catch (error){
        message.error(error.response.data.errorMessage)
        throw error;
    }
}

export const updateMember = async (memberId,updatedData) => {
    try{
        const response = await authInstance.put(`api/member/${memberId}`,updatedData);
        return response.data;
    }catch (error){
        message.error(error.response.data.errorMessage)
        throw error;
    }
}

export const deleteMember = async (memberId) => {
    try{
        const response = await authInstance.delete(`/member/${memberId}`);
        return response.data;
    }catch (error){
        message.error(error.response.data.errorMessage)
        throw error;
    }
}


