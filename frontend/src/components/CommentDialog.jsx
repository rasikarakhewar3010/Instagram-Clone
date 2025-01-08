import { MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { useState } from "react";

const CommentDialog = ({ open, setopen }) => {
    const [text, setText] = useState('');

    const changeEventHandler = (e)=>{
        const inputText =e.target.value;
        if(inputText.trim()){
            setText(inputText);
        } else{
            setText("");
        }
    }

    const sendMessageHandler= async ()=>{
        alert(text)
    }
    return (
        <Dialog open={open}>
            <DialogContent onInteractOutside={() => setopen(false)} className="p-0 max-w-5xll flex flex-col bg-white">
                <div className="flex flex-1">
                    <div className="w-1/2">
                        <img src="https://static.vecteezy.com/system/resources/thumbnails/029/214/620/small_2x/hand-holding-colorful-arrangements-flowers-bright-and-sunny-day-with-simple-aesthetic-romantic-vibes-perfect-for-wedding-greeting-card-flower-card-and-more-photo.jpg"
                            className="w-full h-full object-cover rounded-l-lg"
                            alt="post_image" />
                    </div>
                    <div className="w-1/2 flex flex-col justify-between">
                        <div className="flex items-center justify-between p-4">
                            <div className="flex gap-3 items-center">
                                <a href="">
                                    <Avatar>
                                        <AvatarImage />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </a>
                                <div>
                                    <a href="" className="font-semibold text-xs text-white">Username</a>
                                    {/* <span className=" text-sm text-white" >Bio here...</span> */}
                                </div>
                            </div>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <MoreHorizontal className="cursor-pointer" />
                                </DialogTrigger>
                                <DialogContent className="flex flex-col items-center text-sm text-center">
                                    <div className="cursor-pointer w-full text-[#ED4956] font-bold">
                                        Unfollow
                                    </div>
                                    <hr />
                                    <div className="cursor-pointer w-full text-white">
                                        Add To Favorites
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                        <hr />
                        <div className="flex-1 overflow-y-auto max-h-96 p-4">
                            comments
                        </div>
                        <div className="p-4">
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    placeholder="Add acomment..."
                                    value={text}
                                    onChange={changeEventHandler}
                                    className="outline-non text-sm w-full focus:outline-none bg-transparent border  border-gray-300 p-2 rounded"
                                />
                                <Button disabled={!text.trim()} onClick={sendMessageHandler}  className=" bg-transparent border  border-gray-300 text-white">Send</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CommentDialog