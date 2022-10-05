import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Login.module.scss";
import { Navigate } from "react-router-dom";
import { fetchRegister, selectIsAuth } from "../../redux/slices/authSlice";
import { useForm } from "react-hook-form";
export const Registration = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: "Василий Пупкин",
      email: "vasia@gmail.com",
      password: "1234",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));
    if (!data.payload) {
      return alert("Not was auth");
    }

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to='/' />;
  }
  return (
    <Paper classes={{ root: styles.root }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography classes={{ root: styles.title }} variant='h5'>
          Создание аккаунта
        </Typography>
        <div className={styles.avatar}>
          <Avatar sx={{ width: 100, height: 100 }} />
        </div>
        <TextField
          className={styles.field}
          label='Полное имя'
          fullWidth
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register("fullName", { required: "Enter full name" })}
        />
        <TextField
          className={styles.field}
          label='E-Mail'
          fullWidth
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register("email", { required: "Enter please email" })}
        />
        <TextField
          className={styles.field}
          label='password'
          fullWidth
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register("password", { required: "Enter please password" })}
        />
        <Button
          size='large'
          disabled={!isValid}
          type='submit'
          variant='contained'
          fullWidth>
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
