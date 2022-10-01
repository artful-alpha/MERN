/*eslint-disable*/
import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios.js";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import { Post } from "../Post/index.jsx";

export default function Tags() {
  const { id } = useParams();
  const [isPostTagsLoading, setPostTagsLoading] = useState(true);
  const [postsTags, setPostsTags] = useState([1]);

  useEffect(() => {
    axios.get(`/tags/${id}`).then(({ data }) => {
      setPostsTags(data);
      setPostTagsLoading(false);
      console.log(data);
    });
  }, [id]);

  return (
    <>
      {(isPostTagsLoading ? [...Array(3)] : postsTags).map((item, index) =>
        isPostTagsLoading ? (
          <Post isLoading={isPostTagsLoading} />
        ) : (
          <Post
            id={item._id}
            title={item.title}
            createdAt={item.createdAt}
            imageUrl={item.imageUrl}
            user={item.user}
            viewsCount={item.viewsCount}
            commentsCount={item.commentsCount}
            tags={item.tags}
            children={false}
            isFullPost={false}
            isLoading={false}
            isEditable={false}
          />
        )
      )}
    </>
  );
}
