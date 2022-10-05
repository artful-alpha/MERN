/*eslint-disable*/

import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from "../axios.js";
import { fetchPosts, fetchTags } from "../redux/slices/postSlice";
export const Home = () => {
  const dispatch = useDispatch();
  const { posts, tags } = useSelector((state) => state.posts);

  const userData = useSelector((state) => state.auth.data);
  const [isLoadingCooments, setIsLoadingComments] = useState(true);
  const [allComments, setAllComments] = useState();
  const isPostsLoading = posts.status == "loading";
  const isTagsLoading = posts.status == "loading";
  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());

    axios
      .get("/commnets")
      .then(({ data }) => {
        setAllComments(data);
        setIsLoadingComments(false);
      })
      .catch((err) => alert("Error when get comments post"));
  }, []);
  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={0}
        aria-label='basic tabs example'>
        <Tab label='Новые' value={0}>
          THIS TAB
        </Tab>
        <Tab label='Популярные' value={1} />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
            isPostsLoading ? (
              <Post key={index} isLoading={isTagsLoading} />
            ) : (
              <Post
                key={obj._id}
                id={obj._id}
                title={obj.title}
                imageUrl={obj.imageUrl}
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={3}
                tags={obj.tags}
                isEditable={userData?._id === obj.user._id}
              />
            )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock items={allComments} isLoading={isLoadingCooments} />
        </Grid>
      </Grid>
    </>
  );
};
