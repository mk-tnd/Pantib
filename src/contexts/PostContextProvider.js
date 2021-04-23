import { createContext, useState } from "react";

export const PostContext = createContext();

function PostContextProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState([]);
  return (
    <PostContext.Provider value={{ posts, setPosts, likes, setLikes }}>
      {children}
    </PostContext.Provider>
  );
}

export default PostContextProvider;
