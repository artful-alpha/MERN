import express from "express";

import mongoose from "mongoose";
import {
  loginValidator,
  postCreateValidator,
  registerValidator,
  commentCreateValidator,
} from "./validation/auth.js";
import multer from "multer";
import { checkAuth, handleValidationErrors } from "./utils/index.js";
import { UserController, PostController } from "./controllers/index.js";
import cors from "cors";
mongoose
  .connect(
    "mongodb+srv://artful:a1s2d3@cluster0.bd2shdb.mongodb.net/alpha_blog?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB OK"));

const app = express();
app.use(express.json());
const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(cors());

app.use("/uploads", express.static("uploads"));

app.get("/", (request, result) => {
  result.send("Hello Mern2");
});

app.post(
  "/uploads/",
  checkAuth,
  upload.single("image"),
  (request, response) => {
    response.json({
      url: `/uploads/${request.file.originalname}`,
    });
  }
);

app.post(
  "/auth/register",
  registerValidator,
  handleValidationErrors,
  UserController.register
);

app.post(
  "/auth/login",
  loginValidator,
  handleValidationErrors,
  UserController.login
);

app.get("/auth/me", checkAuth, UserController.getMe);

app.get("/tags/:id", PostController.getPostTags);
app.get("/tag/", PostController.getTags);
app.post("/posts/", checkAuth, postCreateValidator, PostController.create);
app.get("/posts/", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.delete("/posts/:id", checkAuth, PostController.RemovePost);
app.patch("/posts/:id", checkAuth, PostController.UpdatePost);
app.get("/commnets/", PostController.getCommnets);
app.post(
  "/comment/",
  checkAuth,
  commentCreateValidator,
  handleValidationErrors,
  PostController.createComment
);
app.post("/test/", PostController.PostTest);
app.get("/test/", checkAuth, PostController.GetTest);
app.listen(3113, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server Ok");
});
