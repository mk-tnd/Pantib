import React, { useContext, useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "../utils/owl.css";
import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import img1 from "../images/img1.png";
import img2 from "../images/img2.png";
import img3 from "../images/img3.png";
import TopPost from "./TopPost";
import { Context } from "../contexts/ContextProvider";
import axios from "../config/axios";
import PostList from "./PostList";
import { PostContext } from "../contexts/PostContextProvider";

function Feed() {
  const options = {
    margin: 20,
    responsiveClass: true,
    nav: true,
    dots: false,
    autoplay: false,
    loop: true,
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
      700: {
        items: 4,
      },
      1000: {
        items: 5,
      },
    },
  };

  const useStyles = makeStyles({
    root: {
      height: "100%",
    },
  });

  const { zone, setZone } = useContext(Context);
  const { setPosts } = useContext(PostContext);
  const Img = [img1, img2, img3];

  const fetchZone = async () => {
    const res = await axios.get("/zone");
    setZone(res.data.zone);
  };

  const fetchPost = async () => {
    const res = await axios.get("/post");
    setPosts(res.data.posts);
  };

  useEffect(() => {
    fetchZone();
    fetchPost();
  }, []);

  const classes = useStyles();

  return (
    <div>
      <Container>
        <h1>Community</h1>
        <OwlCarousel className="owl-theme" {...options}>
          {zone.map((item, index) => (
            <div key={index} className="item">
              <img
                className="img-community"
                src={Img[+item.Images - 1]}
                alt={item.Images}
              />
            </div>
          ))}
        </OwlCarousel>
        <Grid container item>
          <Grid container direction="column" item xs={12} md={8}>
            <div>
              <h2>Recommended Post</h2>
            </div>
            <div style={{ paddingRight: "20px", marginBottom: "10px" }}>
              <PostList />
            </div>
          </Grid>
          <Grid className={classes.root} container item xs={12} md={4}>
            <div>
              <h2>Top Post</h2>
            </div>
            <div style={{ paddingRight: "20px", marginBottom: "10px" }}>
              <TopPost />
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Feed;
