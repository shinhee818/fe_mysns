
import React, { createContext, useContext, useState } from 'react';

const MemberContext = createContext();

export const useMemberContext = () => {
    return useContext(MemberContext);
};

export const MemberProvider = ({ children }) => {
    const [memberData, setMemberData] = useState();


    const updateMemberData = (newData) => {
        setMemberData(newData);
    };

    return (
        <MemberContext.Provider value={{ memberData,updateMemberData }}>
            {children}
        </MemberContext.Provider>
    );
};
