import PostModel from "../models/Post.js";
import CommentModel from "../models/Comment.js";

export const createComment = async (request, response) => {
  try {
    const comments = new CommentModel({
      text: request.body.text,
      postId: request.body.postId,
    });
    const com = await comments.save();
    response.json(com);
  } catch (error) {
    console.log(error);
    response.status(405).json({
      message: "Not create Comment",
      error: error,
    });
  }
};

export const getCommnet = async (request, response) => {
  try {
    const posts = await CommentModel.find({
      postId: JSON.parse(request.query[0]).postId,
    });
    // console.log(request);
    // console.log(request.body);
    // console.log(request.data);
    // console.log(request.params);
    response.json(posts);
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "Not gets posts comment",
    });
  }
};

export const create = async (request, response) => {
  try {
    const doc = new PostModel({
      title: request.body.title,
      text: request.body.text,
      imageUrl: request.body.imageUrl,
      tags: request.body.tags,
      user: request.userId,
    });
    const post = await doc.save();

    response.json(post);
  } catch (err) {
    console.log(err);
    response.status(404).json({
      message: "Not create Post ",
      error: err,
    });
  }
};

export const getPostTags = async (request, response) => {
  try {
    const posts = await PostModel.find().populate("user").exec();
    const postsTags = posts.filter((post) => {
      return post.tags.includes(request.params.id);
    });
    return response.json(postsTags);
  } catch (error) {
    response.status(500).json({
      message: "Error find post tags",
    });
  }
};

export const getAll = async (request, response) => {
  try {
    const posts = await PostModel.find().populate("user").exec();
    response.json(posts);
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "Not create gets posts",
    });
  }
};

export const getTags = async (request, response) => {
  try {
    const posts = await PostModel.find().limit(5).exec();

    const tags = posts
      .map((obj) => obj.tags)
      .flat()
      .slice(0, 5);

    response.json(tags);
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "Not gets posts tag",
    });
  }
};

export const getOne = async (request, response) => {
  try {
    const postId = request.params.id;

    PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      { returnDocument: "after" },
      (err, doc) => {
        if (err) {
          console.log(err);
          response.status(500).json({
            message: "Not return post",
          });
        }
        if (!doc) {
          console.log("Post not find");
          return response.status(404).json({
            message: "Post not find",
          });
        }

        response.json(doc);
      }
    ).populate("user");
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "Not create gets posts",
    });
  }
};

export const RemovePost = async (request, response) => {
  try {
    const postId = request.params.id;

    PostModel.findOneAndDelete(
      {
        _id: postId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          response.status(500).json({
            message: "Post was not delete",
          });
        }
        if (!doc) {
          console.log(err);
          response.status(500).json({
            message: "Post not find for delete post",
          });
        }

        response.json({
          message: "Post was delete",
        });
      }
    );
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "Not create gets posts",
    });
  }
};

export const UpdatePost = async (request, response) => {
  try {
    const postId = request.params.id;

    PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: request.body.title,
        text: request.body.text,
        imageUrl: request.body.imageUrl,
        tags: request.body.tags,
        user: request.userId,
      },
      (err, doc) => {
        if (err) {
          response.status(500).json({
            message: "Not wosn't Update Post",
            error: err,
          });
        }
        if (!doc) {
          response.status(500).json({
            message: "Post not find for Update post",
          });
        }
        response.json({
          message: "Post was Update",
        });
      }
    );
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "Not update posts",
    });
  }
};
