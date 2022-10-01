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
  const [isLoadingComment, setIsLoadingComment] = useState(true);
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
        console.log(err);
        alert("Error when get post");
      });

    const coment = JSON.stringify({
      postId: id,
    });
    axios.get("/comm/", { params: coment }).then(({ data }) => {
      setComments(data);
      // console.log(data);
      setIsLoadingComment(false);
    });
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

      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 555555",
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}>
        <Index />
      </CommentsBlock>
    </>
  );
};
