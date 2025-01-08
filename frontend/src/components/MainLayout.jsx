import { Outlet } from "react-router-dom";

const MainLayout = ()=>{
    return(
        <div>
            SideBar
            <div>
                <Outlet/>
            </div>
        </div>
    )
}

export default MainLayout;