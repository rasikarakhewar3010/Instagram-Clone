import { Bookmark, MessageCircle, MoreHorizontal, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CommentDialog from "./CommentDialog";
import { useState } from "react";


const Post = () => {
    const [text, setText] = useState("");
    const [open, setopen] = useState(false);

    const changeEventHandler = (e) =>{
        const inputText = e.target.value;
        if(inputText.trim()){
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
                        <AvatarImage src="" alt="Post-iamge" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <h1>Username</h1>
                </div>
                <Dialog >
                    <DialogTrigger asChild>
                        <MoreHorizontal className="cursor-pointer" />
                    </DialogTrigger>
                    <DialogContent className="flex flec-col items-center text-sm text-center">
                        <Button variant="ghost" className="cursor-pointer w-fit text-[#ED4956] font-boald ">Unfollow</Button>
                        <Button variant="ghost" className="cursor-pointer w-fit  text-white bg-white text-gray-800 ">Add to favorites</Button>
                        <Button variant="ghost" className="cursor-pointer w-fit bg-white text-gray-800  ">Delete</Button>
                    </DialogContent>
                </Dialog>
            </div>
            <img
                className="rounded-sm my-2 w-full aspect-square object-cover"
                src="https://static.vecteezy.com/system/resources/thumbnails/029/214/620/small_2x/hand-holding-colorful-arrangements-flowers-bright-and-sunny-day-with-simple-aesthetic-romantic-vibes-perfect-for-wedding-greeting-card-flower-card-and-more-photo.jpg"
                alt="post_image"
            />

            <div className="flex items-center justify-between my-2">
                <div className="flex items-center gap-3">
                    <FaRegHeart size={'22px'} className="cursor-pointer hover:text-gray-600" />
                    <MessageCircle onClick={()=>setopen(true)} className="cursor-pointer hover:text-gray-600" />
                    <Send className="cursor-pointer hover:text-gray-600" />
                </div>
                <Bookmark className="cursor-pointer hover:text-gray-600" />
            </div>
            <span className="font-medium block mb-2">1k likes</span>
            <p>
                <span className="font-medium mr-2">username</span>
                caption
            </p>
            <span onClick={()=>setopen(true) } className="cursor-pointer text-sm text-gray-400">View all 10 comments</span>
            <CommentDialog  open={open} setopen={setopen} />
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