import { useEffect, useState } from "react";
import { Avatar } from "@radix-ui/react-avatar";
import { Heart, Home, LogOut, MessageCircle, PlusSquare, Search, TrendingUp } from "lucide-react";
import { AvatarFallback, AvatarImage } from "./ui/avatar";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../logo.css";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "@/redux/authSlice";
import CreatePost from "./CreatePost";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const { likeNotification } = useSelector((store) => store.realTimeNotification);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Update notifications on login or when likeNotification changes
  useEffect(() => {
    if (likeNotification && likeNotification.length > 0) {
      setNotifications(likeNotification);
      setUnreadCount(likeNotification.length);
    } else {
      setNotifications([]);
      setUnreadCount(0);
    }
  }, [likeNotification]);

  const handleNotificationViewed = () => {
    // Reset unread count when viewing notifications
    setUnreadCount(0);

    // Clear notifications (simulate refreshing logic)
    setTimeout(() => {
      setNotifications([]);
    }, 1000);
  };

  const sidebarHandler = (textType) => {
    if (textType === "Logout") {
      logoutHandler();
    } else if (textType === "Create") {
      setOpen(true);
    } else if (textType === "Profile") {
      navigate(`/profile/${user?._id}`);
    } else if (textType === "Home") {
      navigate("/");
    } else if (textType === "Messages") {
      navigate("/chat");
    }
  };

  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/logout", { withCredentials: true });
      if (res.data.success) {
        dispatch(setAuthUser(null));
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const sidebarItems = [
    { icon: <Home />, text: "Home" },
    { icon: <Search />, text: "Search" },
    { icon: <TrendingUp />, text: "Explore" },
    { icon: <MessageCircle />, text: "Messages" },
    { icon: <Heart />, text: "Notifications" },
    { icon: <PlusSquare />, text: "Create" },
    {
      icon: (
        <Avatar className="w-6 h-6 rounded-full">
          <AvatarImage src={user?.profilePicture || ""} alt="Profile" className="rounded-full h-6 w-6" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ),
      text: "Profile",
    },
    { icon: <LogOut />, text: "Logout" },
  ];

  return (
    <div className="fixed top-0 z-10 left-0 px-4 border-r border-gray-300 w-[16%] h-screen">
      <div className="flex flex-col">
        <h1 className="my-8 pl-3 font-bold logo1 text-xl">Instagram Clone</h1>
        <div>
          {sidebarItems.map((item, index) => (
            <div
              onClick={() => sidebarHandler(item.text)}
              key={index}
              className="flex items-center space-x-2 p-3 my-3 hover:bg-gray-100 relative cursor-pointer rounded-lg gap-3"
            >
              {item.icon}
              <span>{item.text}</span>
              {item.text === "Notifications" && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      size="icon"
                      className="rounded-full h-5 w-5 bg-red-600 hover:bg-red-600 absolute bottom-6 left-6"
                      onClick={handleNotificationViewed}
                    >
                      {unreadCount}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div>
                      {notifications.length === 0 ? (
                        <p>No new notifications</p>
                      ) : (
                        notifications.map((notification) => (
                          <div key={notification.userId} className="flex items-center gap-2 my-2">
                            <Avatar className="rounded-full h-6 w-6">
                              <AvatarImage
                                src={notification.userDetails?.profilePicture}
                                className="rounded-full h-6 w-6"
                              />
                              <AvatarFallback className="text-white w-6 h-6 p-2">CN</AvatarFallback>
                            </Avatar>
                            <p className="text-sm">
                              <span className="font-bold">{notification.userDetails?.username}</span> liked your post
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </div>
          ))}
        </div>
      </div>
      <CreatePost open={open} setOpen={setOpen} />
    </div>
  );
};

export default LeftSidebar;
