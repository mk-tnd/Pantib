import React, { useContext, useEffect } from "react";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "../utils/owl.css";
import { Context } from "../contexts/ContextProvider";
import axios from "../config/axios";
import PostList from "../components/PostList";
import { PostContext } from "../contexts/PostContextProvider";
import img1 from "../images/img11.gif";
import img2 from "../images/img21.gif";
import img3 from "../images/img31.gif";
import img4 from "../images/img41.jpg";

function Zone() {
  const Img = [img1, img2, img3, img4];
  const { setPosts, posts } = useContext(PostContext);
  const { zone, zid } = useContext(Context);

  const fetchPostZone = async () => {
    const res = await axios.get(`/zone/postzone/${zid}`);
    setPosts(res.data.postszone);
  };

  useEffect(() => {
    fetchPostZone();
  }, []);

  return (
    <>
      <div className="container mb-4">
        <div
          className="row justify-content-center align-items-center"
          style={{
            backgroundImage: `url(${Img[zid - 1]})`,
            backgroundPosition: "center",
            height: "300px",
          }}
        >
          <h1 style={{ backgroundColor: "white", padding: "5px" }}>
            {zone[zid - 1].ZoneName}
          </h1>
        </div>
      </div>
      <div className="container">
        <h1>Post</h1>
        <div
          className="row"
          style={{ paddingRight: "20px", marginBottom: "10px" }}
        >
          <PostList posts={posts} />
        </div>
      </div>
    </>
  );
}
export default Zone;
