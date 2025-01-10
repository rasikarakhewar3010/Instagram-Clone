import { Bookmark, MessageCircle, MoreHorizontal, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CommentDialog from "./CommentDialog";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setPosts } from "@/redux/postSlice";


const Post = ({ post }) => {
    const [text, setText] = useState("");
    const [open, setopen] = useState(false);
    const { user } = useSelector(store => store.auth);
    const {posts} = useSelector(store=>store.post);
    const dispatch = useDispatch();

    const deletePosthandler = async ()=>{
        try {
            const res = await axios.delete(`http://localhost:8000/api/v1/post/delete/${post?._id}`, {withCredentials:true});
            if(res.data.success){
                const updatedPostData = posts.filter((postItem)=> postItem?._id!= post?._id);
                dispatch(setPosts(updatedPostData))
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    const changeEventHandler = (e) => {
        const inputText = e.target.value;
        if (inputText.trim()) {
            setText(inputText);
        } else {
            setText("");
        }
    }
    return (
        <div className="my-8 w-full max-w-sm mx-auto">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Avatar >
                        <AvatarImage src={post.author?.profilePicture} alt="Post-iamge" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <h1>{post.author?.username}</h1>
                </div>
                <Dialog >
                    <DialogTrigger asChild>
                        <MoreHorizontal className="cursor-pointer" />
                    </DialogTrigger>
                    <DialogContent className="flex flec-col items-center text-sm text-center">
                        <Button variant="ghost" className="cursor-pointer w-fit text-[#ED4956] font-boald ">Unfollow</Button>
                        <Button variant="ghost" className="cursor-pointer w-fit  text-white bg-white text-gray-800 ">Add to favorites</Button>
                        {
                            user && user?._id === post?.author._id && <Button variant="ghost" onClick={deletePosthandler} className="cursor-pointer w-fit bg-white text-gray-800  ">Delete</Button>
                        }
                    </DialogContent>
                </Dialog>
            </div>
            <img
                className="rounded-sm my-2 w-full aspect-square object-cover"
                src={post.image}
                alt="post_image"
            />

            <div className="flex items-center justify-between my-2">
                <div className="flex items-center gap-3">
                    <FaRegHeart size={'22px'} className="cursor-pointer hover:text-gray-600" />
                    <MessageCircle onClick={() => setopen(true)} className="cursor-pointer hover:text-gray-600" />
                    <Send className="cursor-pointer hover:text-gray-600" />
                </div>
                <Bookmark className="cursor-pointer hover:text-gray-600" />
            </div>
            <span className="font-medium block mb-2">{post.likes.length} likes</span>
            <p>
                <span className="font-bold mr-2">{post.author?.username}</span>
                {post.caption}
            </p>
            <span onClick={() => setopen(true)} className="cursor-pointer text-sm text-gray-400">View all {post.comments.length} comments</span>
            <CommentDialog open={open} setopen={setopen} />
            <div className="flex items-center justify-between">
                <input
                    type="text"
                    placeholder="Add acomment..."
                    value={text}
                    onChange={changeEventHandler}
                    className="outline-non text-sm w-full focus:outline-none"
                />
                {
                    text && <span className="text-[#3BADF8]">Post</span>
                }
            </div>
        </div>
    )

}

export default Post;