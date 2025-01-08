import { Avatar } from "@radix-ui/react-avatar";
import { Heart, Home, LogOut, MessageCircle, PlusSquare, Search, TrendingUp } from "lucide-react";
import { AvatarFallback, AvatarImage } from "./ui/avatar";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../logo.css"

const sidebarItems = [
  { icon: <Home />, text: "Home" },
  { icon: <Search />, text: "Search" },
  { icon: <TrendingUp />, text: "Explore" },
  { icon: <MessageCircle />, text: "Message" },
  { icon: <Heart />, text: "Notifications" },
  { icon: <PlusSquare />, text: "Create" },
  {
    icon: (
      <Avatar className="w-6 h-6 rounded ">
        <AvatarImage src="https://avatars.githubusercontent.com/u/124599?v=4" alt="Profile" className="rounded-full"/>
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    ),
    text: "Profile",
  },
  { icon: <LogOut />, text: "Logout" },
];

const LeftSidebar = () => {
    const navigate = useNavigate();
    const logoutHandler = async () => {
        console.log("Logout handler called");
        try {
            const res = await axios.get('http://localhost:8000/api/v1/user/logout', { withCredentials: true });
            console.log("Server response:", res.data);
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Logout failed");
        }
    };
    
    const sidebarHandler= (textType) =>{
        if(textType === 'Logout') logoutHandler();
    }
  return (
    <div className="fixed top-0 z-10 left-0 px-4 border-r border-gray-300 w-[16%] h-screen">
      <div className="flex flex-col">
        <h1 className="my-8 pl-3 font-bold logo1 text-xl">Instagram Clone</h1>
        <div>
        {sidebarItems.map((item, index) => (
        <div onClick={()=>sidebarHandler(item.text)} key={index} className="flex items-center space-x-2 p-3 my-3 hover:bg-gray-100 relative cursor-pointer rounded-lg gap-3">
          {item.icon}
          <span>{item.text}</span>
        </div>
      ))}
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
