import React from "react";
import { Container, Grid } from "@material-ui/core";

import PostCard from "../components/PostCard";
import { GET_POSTS } from "../util/graphql/queries";
import { useQuery } from "@apollo/client";

function Home() {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const posts = data.getPosts;

  return (
    <Container>
      <Grid container>
        {posts &&
          posts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post._id}>
              <PostCard post={post} />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}

export default Home;
