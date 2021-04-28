import { useEffect } from "react";
import { createContext, useState } from "react";

export const PostContext = createContext();

function PostContextProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState([]);
  const [postId, setPostId] = useState(null);
  const [thisPost, setThisPost] = useState([]);
  return (
    <PostContext.Provider
      value={{
        posts,
        setPosts,
        likes,
        setLikes,
        postId,
        setPostId,
        thisPost,
        setThisPost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

export default PostContextProvider;
