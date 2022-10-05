import React from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import axios from "../../axios.js";
import { useParams } from "react-router-dom";
export const Index = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const { id } = useParams();

  const submitComment = async ({ textComment }) => {
    console.log("Form submit", textComment);
    axios
      .post("/comment/", { textComment, postId: id })
      .then((e) => console.log(e));
  };
  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src='https://mui.com/static/images/avatar/5.jpg'
        />
        <form className={styles.form} onSubmit={handleSubmit(submitComment)}>
          <TextField
            label='Написать комментарий'
            variant='outlined'
            maxRows={10}
            multiline
            fullWidth
            error={Boolean(errors.text?.message)}
            helperText={errors.text?.message}
            {...register("textComment", {
              required: "Please enter your comment",
            })}
          />
          <Button type='submit' variant='contained'>
            Отправить
          </Button>
        </form>
      </div>
    </>
  );
};
