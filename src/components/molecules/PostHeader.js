import React from "react";
import {Tag} from "antd";
import {MenuBtn} from "../atoms/PostAtom";

export default function PostHeader({data}){
    const formatDateString = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const koreanDate = new Intl.DateTimeFormat('ko-KR', options).format(new Date(dateString));
        return koreanDate;
    };

    const tagElements = data.tagList.map((tag, index) => (
        <Tag key={index} color="#9BBCD9"
             bordered={false}
             style={{
            fontSize: "30px", // Increase the font size here
            textAlign: "center",
            height: "50px",
            marginRight: "25px",
            marginTop:"15px",
            width:"120px",
            borderRadius: "30px",
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
        }}
        >{tag}</Tag>
    ));
    return(
       <div style={{flexDirection:"column",display:"flex",}}>

           <div style={{ flexDirection: "row", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
               <div style={{ fontSize: '90px', fontWeight: 'bolder' }}>
                   {data.title || 'Title not available'}

               </div>



           </div>


           <div style={{paddingBottom: '10px', paddingTop: '50px', display: 'flex', flexDirection: 'row',alignItems: 'center' }}>
               <div style={{ fontSize: '25px', fontWeight: 'bolder', marginRight: '20px' }}>
                   {data.memberName || 'Member name not available'}
               </div>
               <div style={{ fontSize: '22px' }}>{formatDateString(data.regsterDate)}</div>
           </div>
           <div style={{display:"flex",justifyContent:"space-between"}}>
               <div style={{display:'flex'}}>{tagElements}</div>
           </div>


       </div>
    )
}