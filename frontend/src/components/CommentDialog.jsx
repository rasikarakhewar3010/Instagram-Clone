import { MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { useState } from "react";
import { useSelector } from "react-redux";
import Comment from "./Comment";

const CommentDialog = ({ open, setopen }) => {
    const [text, setText] = useState("");
    const { selectedPost } = useSelector((store) => store.post);

    const changeEventHandler = (e) => {
        const inputText = e.target.value;
        setText(inputText.trim() ? inputText : "");
    };

    const sendMessageHandler = async () => {
        alert(text);
        setText(""); // Clear the input after sending the message
    };

    return (
        <Dialog open={open}>
            <DialogContent
                onInteractOutside={() => setopen(false)}
                className="p-0 max-w-4xl flex flex-col bg-white rounded-lg shadow-lg overflow-hidden bg-white"
            >
                <div className="flex h-[70vh]">
                    {/* Left Side: Post Image */}
                    <div className="w-1/2 bg-black">
                        <img
                            src={selectedPost?.image}
                            className="w-full h-full object-cover"
                            alt="post_image"
                        />
                    </div>

                    {/* Right Side: Comments */}
                    <div className="w-1/2 flex flex-col">
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b">
                            <div className="flex gap-3 items-center">
                                <Avatar>
                                    <AvatarImage src={selectedPost?.author?.profilePicture} />
                                    <AvatarFallback className="text-white">CN</AvatarFallback>
                                </Avatar>
                                <div>
                                    <a href="#" className="font-semibold text-sm text-white">
                                        {selectedPost?.author?.username}
                                    </a>
                                </div>
                            </div>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <MoreHorizontal className="cursor-pointer text-gray-600" />
                                </DialogTrigger>
                                <DialogContent className="flex flex-col items-center text-sm text-center bg-white shadow-lg rounded-lg py-2">
                                    <div className="cursor-pointer w-full text-[#ED4956] font-bold py-2">
                                        Unfollow
                                    </div>
                                    <hr />
                                    <div className="cursor-pointer w-full text-gray-800 py-2">
                                        Add To Favorites
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>

                        {/* Comments Section */}
                        <div className="flex-1 overflow-y-auto px-4 py-3 bg-white">
                            {selectedPost?.comments.map((comment) => (
                                <Comment key={comment._id} comment={comment} />
                            ))}
                        </div>

                        {/* Add Comment */}
                        <div className="border-t px-4 py-2">
                            <div className="flex items-center gap-3">
                                <input
                                    type="text"
                                    placeholder="Add a comment..."
                                    value={text}
                                    onChange={changeEventHandler}
                                    className="flex-1 text-sm bg-gray-100 border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring focus:ring-blue-500"
                                />
                                <Button
                                    disabled={!text.trim()}
                                    onClick={sendMessageHandler}
                                    className={`text-sm font-semibold ${
                                        text.trim()
                                            ? "text-blue-500 cursor-pointer"
                                            : "text-gray-400 cursor-not-allowed"
                                    }`}
                                >
                                    Post
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CommentDialog;
