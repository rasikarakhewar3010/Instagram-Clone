import { useSelector } from "react-redux";
import Post from "./Post";

const Posts = () => {
    const { posts } = useSelector((store) => store.post);

    // Sort posts by date (latest first)
    const sortedPosts = [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (
        <div>
            {
                sortedPosts.map((post) => <Post key={post._id} post={post} />)
            }
        </div>
    );
};

export default Posts;
