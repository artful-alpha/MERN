import { body } from "express-validator";

export const registerValidator = [
  body("email", "Invalid email format").isEmail(),
  body("password", " Pass length must be 5 leter").isLength({ min: 5 }),
  body("fullName", "Please Enter Name").isLength({ min: 3 }),
  body("avataqUrl", "Erro Url-link avatar").optional().isURL(),
];

export const loginValidator = [
  body("email", "Invalid email format").isEmail(),
  body("password", " Pass length must be 5 leter").isLength({ min: 5 }),
];

export const postCreateValidator = [
  body("title", "Please enter title post").isLength({ min: 3 }).isString(),
  body("text", "Enter pleease tex of post").isLength({ min: 10 }).isString(),
  body("tags", "Invalit format tags (enter please array)").optional().isArray(),
  body("imageUrl", "Invalid Url image of post").optional().isString(),
];

export const commentsCreateValidator = [
  body("text", "Please enter valid title comment")
    .isLength({ min: 3 })
    .isString(),
];
