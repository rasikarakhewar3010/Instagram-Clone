import { Outlet } from "react-router-dom";
import Feed from "./Feed";
import RightSidebar from "./RightSidebar";

const Home = ()=>{
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