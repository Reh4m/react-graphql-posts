import React, { useState, useEffect } from "react";
import { Container, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import PostCard from "../components/PostCard";
import SkeletonLoader from "../components/SkeletonLoader";

import { INFINITE_SCROLL_POSTS } from "../util/graphql/queries";
import { useQuery } from "@apollo/client";

const useStyles = makeStyles((theme) => ({
  spacing: {
    margin: theme.spacing(2),
  },
}));

let pageSize = 6;
let pageNum = 1;

function Home() {
  const classes = useStyles();

  const [showMore, setShowMore] = useState(true);

  const variables = {
    pageNum: 1,
    pageSize,
    sort: { by: "likes", order: "asc" },
  };

  const {
    loading,
    error,
    data: { infiniteScrollPosts: getPosts } = [],
    fetchMore,
  } = useQuery(INFINITE_SCROLL_POSTS, {
    variables,
  });

  useEffect(() => {
    if (getPosts && getPosts.hasMore) {
      setShowMore(true);
    } else {
      setShowMore(false);
    }
  }, [getPosts]);

  function showMorePosts() {
    pageNum++;
    // fetch more data and transform original result
    fetchMore({
      variables: {
        // pageNum incremented by 1
        pageNum,
        pageSize,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        const newPosts = fetchMoreResult.infiniteScrollPosts.posts;
        const hasMore = fetchMoreResult.infiniteScrollPosts.hasMore;

        return {
          infiniteScrollPosts: {
            __type: prevResult.infiniteScrollPosts.__typename,
            // Merge previous posts with new posts
            posts: [...prevResult.infiniteScrollPosts.posts, ...newPosts],
            hasMore,
          },
        };
      },
    });
  }

  return (
    <Container>
      <Grid container>
        {loading
          ? Array.from(new Array(3)).map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <SkeletonLoader />
              </Grid>
            ))
          : getPosts.posts &&
            getPosts.posts.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post._id}>
                <PostCard post={post} />
              </Grid>
            ))}
        {error}
      </Grid>
      <Grid container justify="center" alignItems="center">
        <div className={classes.spacing}>
          {showMore ? (
            <Button
              variant="contained"
              color="secondary"
              onClick={showMorePosts}
            >
              Fetch More
            </Button>
          ) : (
            <Typography color="error" variant="h6" gutterBottom>
              You’ve reached the end of the list.
            </Typography>
          )}
        </div>
      </Grid>
    </Container>
  );
}

export default Home;
