const Post = require("../models/Post");
const Comment = require("../models/Comment");
const voteController = {};

voteController.checkVoteStatus = async (req, res, next) => {
  const { type } = req.body;
  console.log(type, "type in checkvotestatus");
  let checkVoteStatus;
  try {
    if (type === "post") {
      checkVoteStatus = await Post.checkVoteStatus(req);
    } else {
      checkVoteStatus = await Comment.checkVoteStatus(req);
    }
    req.voteStatus = checkVoteStatus;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "checking vote status failed" });
  }
};

voteController.upVote = async (req, res) => {
  const type = req.body.type === "post" ? Post : Comment;
  console.log(req.body, " req. body ");
  let message;
  let newVoteStatus;
  try {
    if (req.voteStatus != 0) {
      // -1 , 1
      await type.cancelVote(req);
      message = "Canceled successfully!";
      newVoteStatus = 0;
    }
    if (req.voteStatus != 1) {
      // -1 , 0
      await type.upVote(req);
      message = "Upvoted successfully!";
      newVoteStatus = 1;
    }
    req.voteOperation = "upVote";
    let numoflikes;
    if (type === Post) {
      const res = await Post.changeNumOfLikes(req);
      numoflikes = res.numoflikes;
    }

    res.status(200).json({ message, newVoteStatus, numoflikes });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "downVote did not succeed" });
  }
};

voteController.downVote = async (req, res) => {
  const type = req.body.type === "post" ? Post : Comment;
  let message;
  let newVoteStatus;
  try {
    if (req.voteStatus != 0) {
      await type.cancelVote(req);
      message = "Canceled successfully!";
      newVoteStatus = 0;
    }
    if (req.voteStatus != -1) {
      await type.downVote(req);
      message = "downVoted successfully!";
      newVoteStatus = -1;
    }
    req.voteOperation = "downVote";
    let numoflikes;
    if (type === Post) {
      const res = await Post.changeNumOfLikes(req);
      numoflikes = res.numoflikes;
    }
    res.status(200).json({ message, newVoteStatus, numoflikes });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "downVote did not succeed" });
  }
};

voteController.cancelVote = async (req, res) => {
  const type = req.body.type === "post" ? Post : Comment;
  try {
    const canceledVote = await type.cancelVote(req);
    res.status(200).json({ message: "Cancelled vote successfully!" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "CancelVote did not succeed" });
  }
};

module.exports = voteController;
