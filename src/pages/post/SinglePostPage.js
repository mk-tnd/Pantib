import React from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

function SinglePostPage() {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" href="/" onClick={handleClick}>
        หน้าหลัก
      </Link>
      <Link
        color="inherit"
        href="/getting-started/installation/"
        onClick={handleClick}
      >
        Core
      </Link>
      <Link
        color="textPrimary"
        href="/components/breadcrumbs/"
        onClick={handleClick}
        aria-current="page"
      >
        Breadcrumb
      </Link>
    </Breadcrumbs>
  );
}

export default SinglePostPage;
