import React from "react";
/*eslint-disable*/
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "../axios.js";
import ReactMarkdown from "react-markdown";
import MyComment from "../components/MyComment";
import { useSelector } from "react-redux";

export const FullPost = () => {
  const [value, setValue] = useState();
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();
  const [comments, setComments] = useState("");
  const [isLoadingCooments, setIsLoadingComments] = useState(true);
  const [pri, setPri] = useState("");
  const { data } = useSelector((state) => state.auth);

  useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setValue(res.data);
        setLoading(false);
      })
      .catch((err) => {
        alert("Error when get post");
      });

    axios
      .get("/commnets", { params: { postId: id } })
      .then(({ data }) => {
        setComments(data);
        setIsLoadingComments(false);
      })
      .catch((err) => alert("Error when get comments post"));
  }, []);

  if (isLoading) {
    return <Post isLoading={true} isFullPost />;
  }

  return (
    <>
      <Post
        id={value._id}
        title={value.title}
        imageUrl={value.imageUrl}
        user={value.user}
        createdAt={value.createdAt}
        viewsCount={value.viewsCount}
        commentsCount={3}
        tags={value.tags}
        isFullPost>
        <ReactMarkdown children={value.text} />
      </Post>

      <CommentsBlock items={comments} isLoading={isLoadingCooments}>
        {data ? <Index /> : <p></p>}
      </CommentsBlock>
    </>
  );
};
