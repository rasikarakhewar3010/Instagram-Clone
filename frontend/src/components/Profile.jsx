import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import useGetUserProfile from "@/hooks/useGetUserProfile";
import useFollowUnfollow from "@/hooks/useFollowUnfollow";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { AtSign, Heart, MessageCircle } from "lucide-react";

const Profile = () => {
  const params = useParams();
  const userId = params.id;
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("posts");

  // Fetch user profile using custom hook
  useGetUserProfile(userId);

  const { followUnfollowUser, loading: followLoading, error: followError } = useFollowUnfollow();
  const { userProfile, user } = useSelector((store) => store.auth);

  // Derived states
  const isLoggedInUserProfile = user?._id === userProfile?._id;
  const isFollowing = userProfile?.followers?.some((follower) => follower._id === user?._id);

  // Handle Tab Change
  const handleTabChange = (tab) => setActiveTab(tab);

  // Handle Follow/Unfollow
  const handleFollowUnfollow = async () => {
    try {
      console.log("Initiating Follow/Unfollow API call...");
      const result = await followUnfollowUser(userProfile?._id);
  
      if (result?.success) {
        alert(result.message);
        dispatch({
          type: "UPDATE_USER_PROFILE",
          payload: result.updatedProfile,
        });
      } else {
        console.error("Error from API:", result?.message);
        alert(result?.message || "Failed to process the request.");
      }
    } catch (error) {
      console.error("Unexpected Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  
  // Displayed posts based on active tab
  const displayedPosts =
    activeTab === "posts" ? userProfile?.posts : userProfile?.bookmarks;

  return (
    <div className="flex max-w-5xl justify-center mx-auto pl-10">
      <div className="flex flex-col gap-20 p-8">
        {/* Profile Header */}
        <div className="grid grid-cols-2">
          <section className="flex items-center justify-center">
            <Avatar className="h-32 w-32">
              <AvatarImage src={userProfile?.profilePicture} alt="profilephoto" />
              <AvatarFallback className="text-white">
                {userProfile?.username?.charAt(0).toUpperCase() || "?"}
              </AvatarFallback>
            </Avatar>
          </section>
          <section>
            <div className="flex flex-col gap-5">
              {/* Profile Actions */}
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">{userProfile?.username}</span>
                {isLoggedInUserProfile ? (
                  <>
                    <Link to="/account/edit">
                      <Button variant="secondary" className="hover:bg-gray-200 h-8">
                        Edit Profile
                      </Button>
                    </Link>
                    <Button variant="secondary" className="hover:bg-gray-200 h-8">
                      View Archive
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={handleFollowUnfollow}
                    className={`${
                      isFollowing ? "bg-red-500" : "bg-[#0095F6]"
                    } hover:bg-opacity-80 h-8`}
                    disabled={followLoading}
                  >
                    {followLoading ? "Processing..." : isFollowing ? "Unfollow" : "Follow"}
                  </Button>
                )}
              </div>
              {/* Stats */}
              <div className="flex items-center gap-4">
                <p>
                  <span className="font-semibold">
                    {userProfile?.posts?.length || 0}
                  </span>{" "}
                  posts
                </p>
                <p>
                  <span className="font-semibold">
                    {userProfile?.followers?.length || 0}
                  </span>{" "}
                  followers
                </p>
                <p>
                  <span className="font-semibold">
                    {userProfile?.following?.length || 0}
                  </span>{" "}
                  following
                </p>
              </div>
              {/* Bio */}
              <div className="flex flex-col gap-1">
                <span className="font-semibold">
                  {userProfile?.bio || "No bio added yet..."}
                </span>
                {userProfile?.username && (
                  <Badge className="w-fit" variant="secondary">
                    <AtSign /> <span className="pl-1">{userProfile?.username}</span>
                  </Badge>
                )}
              </div>
            </div>
          </section>
        </div>

        {/* Tabs Section */}
        <div className="border-t border-t-gray-200">
          <div className="flex items-center justify-center gap-10 text-sm">
            {["posts", "saved", "reels", "tags"].map((tab) => (
              <span
                key={tab}
                className={`py-3 cursor-pointer ${
                  activeTab === tab ? "font-bold" : ""
                }`}
                onClick={() => handleTabChange(tab)}
              >
                {tab.toUpperCase()}
              </span>
            ))}
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-3 gap-1">
            {displayedPosts?.map((post) => (
              <div key={post?._id} className="relative group cursor-pointer">
                <img
                  src={post?.image}
                  alt="postimage"
                  className="rounded-sm my-2 w-full aspect-square object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center text-white space-x-4">
                    <button className="flex items-center gap-2 hover:text-gray-300">
                      <Heart />
                      <span>{post?.likes?.length || 0}</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-gray-300">
                      <MessageCircle />
                      <span>{post?.comments?.length || 0}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
