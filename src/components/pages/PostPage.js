import Post from "../organisms/Post";
import {Tabs } from 'antd';
import {HeartOutlined,ClockCircleOutlined} from "@ant-design/icons";
import {useState} from "react";
import RecentPost from "../organisms/RecentPost";
import Header from "../organisms/Header";
import {usePostContext} from "../api/context/PostContext";
import {useRecnetPostContext} from "../api/context/RecentPostContext";
import {getPosts} from "../api/PostApi";

function PostPage(){
    const [current, setCurrent] = useState(1);
    const [recentCurrent,setRecentCurrent] = useState(1);
    const {updatePostData} = usePostContext();
    const{updateRecentPostData} = useRecnetPostContext();

    const fetchData = async () => {
        try {
            const data = await getPosts(current - 1,'VIEWS');
            updatePostData(data);
        } catch (error) {
        }
    };

    const fetchRecentData = async () => {
        try {
            const data = await getPosts(recentCurrent - 1,'RECENT');
            updateRecentPostData(data);
        } catch (error) {
        }
    };

    return(

        <div style={{ width: '100%',paddingBottom:"10px",paddingTop:"50px" }}>
            <Header />
            <Tabs
                size={"large"}

                defaultActiveKey="1"
                items={[
                    // {
                    //     label: (
                    //         <div>
                    //             <HeartOutlined style={{ marginRight: '8px' }} />
                    //             좋아요순
                    //         </div>
                    //     ),
                    //     key: '1',
                    //     children: <Post getPostData={fetchData} current={current} setCurrent={setCurrent}/>,
                    // },
                    {
                        label: (
                            <div>
                                <ClockCircleOutlined style={{ marginRight: '8px' }} />
                                최신순
                            </div>
                        ),
                        key: '2',
                        children: <RecentPost getPostData={fetchRecentData} current={recentCurrent} setCurrent={setRecentCurrent}/>,
                    }
                ]}
            />
        </div>
    )
}
export default PostPage;