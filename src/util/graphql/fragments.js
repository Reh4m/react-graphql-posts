import { gql } from "@apollo/client";

export const fragments = {
  postFields: gql`
    fragment PostFields on Post {
      title
      imageUrl
      description
      categories
      messageCount
      likes
    }
  `,
};
