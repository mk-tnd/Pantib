import React, { useContext, useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "../utils/owl.css";
import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import img1 from "../images/img1.gif";
import img2 from "../images/img2.gif";
import img3 from "../images/img3.gif";
import img4 from "../images/img4.gif";
import TopPost from "./TopPost";
import { Context } from "../contexts/ContextProvider";
import axios from "../config/axios";
import PostList from "./PostList";
import Typography from "@material-ui/core/Typography";
import { PostContext } from "../contexts/PostContextProvider";

function Feed(prop) {
  const options = {
    margin: 50,
    responsiveClass: true,
    nav: true,
    dots: false,
    autoplay: false,
    loop: false,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 4,
      },
    },
  };

  const useStyles = makeStyles({
    root: {
      height: "100%",
    },
  });

  const { zone, setZone } = useContext(Context);
  const { zid, setZid } = useContext(Context);
  const { posts, setPosts } = useContext(PostContext);
  const [recPosts, setRecPosts] = useState([]);
  const [topPosts, setTopPosts] = useState([]);
  const Img = [img1, img2, img3, img4];

  const handleZone = (e) => {
    prop.Zone(true);
    setZid(+e.target.id);
  };

  const fetchZone = async () => {
    const res = await axios.get("/zone");
    setZone(res.data.zone);
  };

  const fetchPost = async () => {
    const res = await axios.get("/post");
    setPosts(res.data.posts);
  };

  const fetchRecPost = async () => {
    const res = await axios.get("/post/recpost");
    setRecPosts(res.data.posts);
  };

  const fetchTopPost = async () => {
    const res = await axios.get("/post/toppost");
    setTopPosts(res.data.posts);
  };

  useEffect(() => {
    fetchZone();
    fetchPost();
    fetchRecPost();
    fetchTopPost();
  }, []);

  return (
    <div className="container">
      <h1>Community</h1>
      <div className="row">
        <OwlCarousel className="owl-theme" {...options}>
          {zone.map((item, index) => (
            <div
              onClick={(e) => handleZone(e)}
              style={{ cursor: "pointer" }}
              key={item.id}
              className="item"
            >
              <img
                id={item.id}
                className="img-community"
                src={Img[+item.Images - 1]}
                alt={item.Images}
              />
            </div>
          ))}
        </OwlCarousel>
      </div>
      <div className="row">
        <div className="col-12 col-md-8">
          <div>
            <h2>Recommended Post</h2>
          </div>
          <div style={{ paddingRight: "20px", marginBottom: "10px" }}>
            <PostList posts={recPosts} />
          </div>
        </div>
        <div className="col-12 col-md-4" style={{ height: "100%" }}>
          <div>
            <h2>Top Post</h2>
          </div>
          <div style={{ paddingRight: "20px", marginBottom: "10px" }}>
            <TopPost posts={topPosts} />
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div>
          <Typography variant="body2" component="h1">
            <h2>All Post</h2>
          </Typography>
          <div
            style={{
              paddingRight: "20px",
              marginBottom: "10px",
              overflow: "auto",
              height: "800px",
            }}
          >
            <PostList posts={posts} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feed;
