import PostModel from "../models/Post.js";
import CommentModel from "../models/Comment.js";
import TestModel from "../models/Test.js";
export const createComment = async (request, response) => {
  try {
    const doc = new CommentModel({
      text: request.body.textComment,
      postId: request.body.postId,
      user: request.userId,
    });

    const comment = await doc.save();

    response.json(comment);
  } catch (err) {
    response.status(404).json({
      message: "Not create comment",
      error: err,
    });
  }
};

export const PostTest = async (request, response) => {
  try {
    const doc = new TestModel({
      title: request.body.title,
    });
    const test = await doc.save();

    response.json(test);
  } catch (err) {
    response.status(404).json({
      message: "Not create test ",
      error: err,
    });
  }
};

export const GetTest = async (request, response) => {
  try {
  } catch (err) {
    response.status(404).json({
      message: "Not create test ",
      error: err,
    });
  }
};

export const getCommnets = async (request, response) => {
  try {
    function isEmpty(obj) {
      for (var key in obj) {
        return false;
      }
      return true;
    }

    let comments;
    let getAllComments = false;
    if (isEmpty(request.query)) {
      comments = await CommentModel.find().populate("user");
    } else {
      comments = await CommentModel.find({
        postId: request.query.postId,
      }).populate("user");
    }

    const commentsArr = comments.map((comment) => {
      const { email, fullName } = comment.user;
      const { createdAt, text } = comment;
      return { text, fullName, createdAt };
    });

    response.json(commentsArr);
  } catch (error) {
    response.status(500).json({
      message: "Not comments for post or posts",
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
          response.status(500).json({
            message: "Not return post",
          });
        }
        if (!doc) {
          return response.status(404).json({
            message: "Post not find",
          });
        }

        response.json(doc);
      }
    ).populate("user");
  } catch (error) {
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
          response.status(500).json({
            message: "Post was not delete",
          });
        }
        if (!doc) {
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
    response.status(500).json({
      message: "Not update posts",
    });
  }
};
