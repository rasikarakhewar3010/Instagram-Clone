import { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { readFileAsDataUrl } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const CreatePost = ({ open, setOpen }) => {

    const imageRef = useRef();
    const [file, setFile] = useState("");
    const [caption, setCaption] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [loading, setLoading] = useState(false)

    const fileChangeHandler = async (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setFile(file);
            const dataUrl = await readFileAsDataUrl(file);
            setImagePreview(dataUrl);
        }
    }

    const createPostHandler = async () => {
        const formData = new FormData();
        formData.append("caption", caption);
        if (imagePreview) formData.append("image", file);
        try {
            setLoading(true);
            const res = await axios.post('http://localhost:8000/api/v1/post/addpost', formData, {
                headers:{
                    'Content-Type':'multipart/form-data'
                },
                withCredentials: true
            });
            if(res.data.success){
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message)
        } finally{
            setLoading(false);
        }
    }
    return (
        <Dialog open={open} className="bg-white">
            <DialogContent onInteractOutside={() => setOpen(false)}>
                <DialogHeader className="text-center text-white font-semibold">
                    Create New Post
                </DialogHeader>
                <div className="flex gap-3 items-center">
                    <Avatar>
                        <AvatarImage />
                        <AvatarFallback className="text-white">
                            CN
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="font-semibold text-xs text-white">Username</h1>
                        <span className="text-gray-600 text-xs" >Bio here....</span>
                    </div>
                </div>
                <Textarea value={caption} onChange={(e) => setCaption(e.target.value)} className="focus-visible:ring-transprent border-none text-gray-200 " placeholder="Write a caption" />
                {
                    imagePreview && (
                        <div className="w-full h-64 flec items-center justify-center">
                            <img src={imagePreview} alt="image_preview" className="object-cover h-full w-full rounded-md" />
                        </div>
                    )
                }
                <input ref={imageRef} type="file" className="hidden" onChange={fileChangeHandler} />
                <Button onClick={() => imageRef.current.click()} className="w-fit mx-auto bg-[#0095F6] hover:bg-[#258bcf]">Select from computer</Button>
                {
                    imagePreview && (
                        loading ? (
                            <Button>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please Watit
                            </Button>
                        ) : (
                            <Button onClick={createPostHandler} type="submit" className="w-full">Post</Button>
                        )
                    )
                }
            </DialogContent>
        </Dialog>
    )
}

export default CreatePost;