// PostContext.js

import React, { createContext, useContext, useState } from 'react';

const PostContext = createContext();

export const usePostContext = () => {
    return useContext(PostContext);
};

export const PostProvider = ({ children }) => {
    const [postData, setPostData] = useState([]);

    const updatePostData = (newData) => {
        setPostData(newData);
    };


    return (
        <PostContext.Provider value={{ postData, updatePostData}}>
            {children}
        </PostContext.Provider>
    );
};
