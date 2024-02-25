import {MyImg} from "../atoms/PostAtom";
import my from "../media/profile.png";
import React, {useEffect, useState} from "react";
import {getMember} from "../api/MemberApi";

export default function ProfileBottom({postData}){
    const [member,setMember] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getMember(postData.memberId);
                setMember(data);
            } catch (error) {
            }
        };
        fetchData();
    },[])
    return(
        <div style={{display:"flex",marginTop:"80px", alignItems: 'center',borderBottom:"1px solid #ACB5BD"}}>
            <MyImg style={{margin:"15px",width:"200px",height:"200px"}} imageUrl = {(postData && postData.url)? `http://localhost:8080/images/${postData.url}`:my} />
            <div>
                <div style={{fontSize:"60px",fontWeight:"bolder"}}>
                    {(postData && postData.memberName)?postData.memberName:"member"}
                </div>
                <div style={{fontSize:"30px"}}>
                    {(postData && postData.memberName)?postData.memberName:"member"}

                </div>

            </div>

        </div>

    )
}