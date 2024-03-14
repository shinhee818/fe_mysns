import './App.css';
import PostPage from "../src/components/pages/PostPage"
import {RecoilRoot} from "recoil";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {MyPostPage} from "./components/pages/MyPostPage";
import LoginPage from "./components/pages/LoginPage";
import MyProfilePage from "./components/pages/MyProfilePage";
import MainPostPage from "./components/pages/MainPostPage";
import {PostProvider} from "./components/api/context/PostContext";
import {RecentPostProvider} from "./components/api/context/RecentPostContext";
import {MemberProvider} from "./components/api/context/MemberContext";
import SelectedPost from "./components/pages/SelectedPost";



function App() {
  return (

      <RecoilRoot>
          <PostProvider>
              <RecentPostProvider>
                  <MemberProvider>


                      <BrowserRouter>

                              <Routes>
                                  {/*<Route path="/" element={<PostPage/>}></Route>*/}
                                  <Route path="/main" element={<MainPostPage/>}></Route>
                                  <Route path="/mypost" element={<MyPostPage style={{justifyContent:"center"}}/>}></Route>
                                  <Route path="/" element={<LoginPage/>}></Route>
                                  <Route path="/profile" element={<MyProfilePage/>}></Route>
                                  <Route path="/post/:postId" element={<SelectedPost/>}></Route>
                              </Routes>
                            {/*<MainBottom/>*/}
                      </BrowserRouter>
                  </MemberProvider>
              </RecentPostProvider>
          </PostProvider>
      </RecoilRoot>


  );
}

export default App;
