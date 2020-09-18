import React, { useState } from "react";
import { Container, Grid, Button } from "@material-ui/core";

import PostCard from "../components/PostCard";
import { INFINITE_SCROLL_POSTS } from "../util/graphql/queries";
import { useQuery } from "@apollo/client";

let pageSize = 6;
let pageNum = 1;

function Home() {
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

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <Container>
      <Grid container>
        {getPosts.posts &&
          getPosts.posts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post._id}>
              <PostCard post={post} />
            </Grid>
          ))}
      </Grid>
      <Grid container justify="center" alignItems="center">
        <Button variant="contained" color="secondary" onClick={showMorePosts}>
          Fetch More
        </Button>
      </Grid>
    </Container>
  );
}

export default Home;
