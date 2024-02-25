import {MyProfile} from "../templates/MyProfile";
import {useLocation} from "react-router-dom";

export default function MyProfilePage(){
    const location = useLocation();
    const member = location.state.key;

    return(
        <div style={{width:"100%",paddingBottom:"10px",paddingTop:"50px" }}>
            <MyProfile member={member}/>
        </div>

    )
}