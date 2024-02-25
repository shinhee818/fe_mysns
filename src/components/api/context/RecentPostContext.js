// PostContext.js

import React, { createContext, useContext, useState } from 'react';

const RecentPostContext = createContext();

export const useRecnetPostContext = () => {
    return useContext(RecentPostContext);
};

export const RecentPostProvider = ({ children }) => {
    const [recentPostData, setRecentPostData] = useState([]);


    const updateRecentPostData = (newData) => {
        setRecentPostData(newData);
    };

    return (
        <RecentPostContext.Provider value={{ recentPostData,updateRecentPostData }}>
            {children}
        </RecentPostContext.Provider>
    );
};
