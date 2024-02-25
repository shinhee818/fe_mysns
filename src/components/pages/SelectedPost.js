import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import {getPost} from "../api/PostApi";
import SelectedPostTemplate from "../templates/SelectedPostTemplate";
import MyHeader from "../organisms/MyHeader";

export default function SelectedPost(){
    const[postData,setPostData] = useState();
    const { postId } = useParams();
    const fetchData = async () => {
        try {
            const data = await getPost(postId);
            setPostData(data);
        } catch (error) {
        }
    };
    useEffect(() => {
        fetchData();
    }, [postId]);

    if (!postData) {
        return <div>Loading...</div>; // or handle the loading state
    }



    return(

        <div style={{ width: '100%', paddingBottom: '10px', paddingTop: '50px'  }}>
            <MyHeader postData={postData}/>
            <div style={{display:"flex",justifyContent: 'center', alignItems: 'center'}}>
                <SelectedPostTemplate postData={postData} fetchData={fetchData}/>
            </div>
        </div>

    )
}