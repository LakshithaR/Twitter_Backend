const postSchema = require('../Model/post');
const UserSchema = require('../Model/user');
const CreatePost = async(req,res)=>{
    const { user, content, image } = req.body;
    const users = await UserSchema.findById(user);
    // const existingUser = await UserSchema.findById(user);
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
    if (!user || !content) {
        return res.json({
            Success: false,
            Message: "Post is required"
        });
    }
    const newPost = await postSchema.create({ user, content, image });

    users.posts.push(newPost._id); // Assuming you're storing post IDs in the user's posts array
    await users.save();
    
    res.json({
        Success: true,
        Message: "Post Created Successfully",
        newPost
    });
}

const GetPostById = async(req,res) =>{
    const postId = req.params.id;
    const post = await postSchema.findById(postId);
    res.json({
        Success: true,
        Message: "Post Displayed Successfully",
        data: post
    })
}

const GetAllPosts = async(req,res) => {
    const post = await postSchema.find({});
    res.json({
        Success: true,
        Message: "All Posts Displayed Successfully",
        data: post
    })
}

const DeletePostById=async(req,res)=>{
    const post_id=req.params.id;
    const delete_post=await postSchema.findByIdAndDelete(post_id);
    res.json({
        Success:true,
        Message:"Post Deleted Successfully",
        data:delete_post
    })
}

module.exports={
    CreatePost,
    GetAllPosts,
    GetPostById,
    DeletePostById
};