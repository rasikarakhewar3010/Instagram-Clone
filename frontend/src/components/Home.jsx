import { Outlet } from "react-router-dom";
import Feed from "./Feed";
import RightSidebar from "./RightSidebar";
import useGetAllPost from "@/hooks/useGetAllPosts";

const Home = ()=>{
    useGetAllPost();
    return(
        <div className="flex">
            <div className="flex-grow">
                <Feed/>
                <Outlet/>
            </div>
            <RightSidebar/>
        </div>
    )
}

export default Home;