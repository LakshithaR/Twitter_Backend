const Follow = require('../Model/follow');
const User = require('../Model/user');

// Follow a user
const followUser = async (req, res) => {
    const { userId, followingId } = req.body;
   
        // Check if both users exist
        const user = await User.findById(userId);
        // console.log(user);
        const followingUser = await User.findById(followingId);
        // console.log(followingUser);
        if (!user.is_verified) {
            return res.json({
                Success: false,
                Message: "User is not verified. Please verify your account before placing an order."
            });
        }

        if (!user || !followingUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Check if the user is already following the followingUser
        const existingFollow = await Follow.findOne({ user: userId, following: followingId });
        if (existingFollow) {
            return res.status(400).json({ success: false, message: 'User is already following this user' });
        }

        // Create the follow relationship
        await Follow.create({ user: { _id: userId, name: user.name }, following: { _id: followingId, name: followingUser.name } });

        // Update followers of followingUser
        followingUser.followers.push({ _id: userId, name: user.name });
        await followingUser.save();

        // Update following of user
        user.following.push({ _id: followingId, name: followingUser.name });
        await user.save();

        user.followingCount += 1;
        followingUser.followerCount += 1;

        // Save changes to the database
        await followingUser.save();
        await user.save();

        res.json({ success: true, message: 'User followed successfully' });
   
};

// Unfollow a user
const unfollowUser = async (req, res) => {
    const { userId, followingId } = req.body;

   
        // Check if both users exist
        const user = await User.findById(userId);
        const followingUser = await User.findById(followingId);

        if (!user || !followingUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        if (!user.is_verified) {
            return res.json({
                Success: false,
                Message: "User is not verified. Please verify your account before placing an order."
            });
        }

        // Check if the user is already following the followingUser
        // const existingFollow = await Follow.findOne({ user._id: userId, following._id: followingId });
        const existingFollow = await Follow.findOne({
            'user._id': userId,
            'following._id': followingId
        });
        console.log(existingFollow)
        if (!existingFollow) {
            return res.status(400).json({ success: false, message: 'User is not following this user' });
        }

    // await delete_follow(existingFollow); // You need to implement this function

    const del_link=existingFollow._id;
        // Optionally, you might want to do some additional cleanup or logging here

        const delete_follow=await Follow.findByIdAndDelete(del_link);

    // Remove the followingUser from the user's following list and user from the followingUser's followers list
    user.following.pull(followingId);
    followingUser.followers.pull(userId);

    user.followingCount -= 1;
    followingUser.followerCount -= 1;

    // Save changes to the database
     // // Save changes to the database
    await user.save();
    await followingUser.save();
        res.json({ success: true, message: 'User unfollowed successfully' , delete_follow});
    
};

const getallfollows =async(req,res) => {
    const follows = await Follow.find({});
    res.json({
        Success: true,
        Message: "Follows Fetched Successfully",
        data: follows
    })
}

const delete_follow = async (follow) => {
    try {
        const del_link=follow._id;
        // Optionally, you might want to do some additional cleanup or logging here

        const delete_follow=await Follow.findByIdAndDelete(del_link);
     res.json({
        Success:true,
        Message:"Deleted Successfully",
        data:delete_follow
    })
    } catch (error) {
        // Handle errors appropriately
        console.error('Error deleting follow relationship:', error);
        throw error;
    }
};

module.exports = {
    followUser,
    unfollowUser,
    getallfollows
};
