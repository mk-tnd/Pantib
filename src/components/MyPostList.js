import React from "react";
import MyPost from "../pages/post/MyPost";

function MyPostList(prop) {
  return (
    <div>
      {prop.myPosts.map((item) => (
        <MyPost
          key={item.id}
          {...item}
          setTriggerDelete={prop.setTriggerDelete}
        />
      ))}
    </div>
  );
}

export default MyPostList;
