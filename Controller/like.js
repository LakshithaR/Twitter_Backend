const Post = require('../Model/post');
const Like = require('../Model/like');
const UserSchema = require('../Model/user');

const likePost = async (req, res) => {
    
    const { userId, postId, type } = req.body;

    const users = await UserSchema.findById(userId);
    if (!users) {
        return res.json({
            Success: false,
            Message: "User not found"
        });
    }
    if (!users.is_verified) {
        return res.json({
            Success: false,
            Message: "User is not verified. Please verify your account before placing an order."
        });
    }
    
    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the user has already liked or disliked the post
    const existingLike = await Like.findOne({ userId, postId });
    if (existingLike) {
        // If the user has already liked the post, return an error
        if (existingLike.type === 'like' && type === 'like') {
            return res.status(400).json({ message: 'User has already liked this post' });
         }
        // If the user has already disliked the post, remove the dislike
        if (existingLike.type === 'dislike' && type === 'like') {
            post.dislikesCount -= 1;
            await existingLike.remove();
        }
        // If the user has already liked the post and now dislikes it, update the like to dislike
        if (existingLike.type === 'like' && type === 'dislike') {
            post.likesCount -= 1;
            post.dislikesCount += 1;
            existingLike.type = 'dislike';
            await existingLike.save();
         }
    } else {
        // If the user has not liked or disliked the post before, create a new like
        if (type === 'like') {
            post.likesCount += 1;
        } else if (type === 'dislike') {
            post.dislikesCount += 1;
        }
        await Like.create({ userId, postId, type });
    }

    await post.save();

    res.json({
        success:true,
        message:"Liked/ Disliked the Post Successfully"
    })
};

module.exports = {
    likePost,
};
