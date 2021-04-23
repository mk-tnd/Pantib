import React from "react";
import Post from "../pages/post/Post";

function MyPostList(prop) {
  return (
    <div>
      {prop.myPosts.map((item) => (
        <Post key={item.id} {...item} />
      ))}
    </div>
  );
}

export default MyPostList;
