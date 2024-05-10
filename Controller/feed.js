const User = require('../Model/user');
const Post = require('../Model/post');

const getFeeds = async (req, res) => {
    const userId = req.params.id; // Assuming you have middleware to extract authenticated user ID

    
        // Find the user
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (!user.is_verified) {
            return res.json({
                Success: false,
                Message: "User is not verified. Please verify your account before placing an order."
            });
        }

        // Get IDs of users being followed by the current user
        const followingIds = user.following.map(follow => follow._id);
        // console.log(followingIds)
        // Find posts from users being followed
        // const feeds = await Post.find({ user: { $in: followingIds } }).populate('user', 'name');
        const feed=[]
        for (const followingId of followingIds) {
            // const posting=await User.findById(followingId);
            // console.log(posting)
            // feed.append(posting.posts._id)
            // console.log(feed)
            const posting = await Post.find({ user: followingId });
            feed.push(...posting);
            
        }
        res.json({ success: true, message: 'Feeds fetched successfully', data:feed});
   
};

const getfeedbylikes = async (req, res) => {
    const userId = req.params.id; // Assuming you have middleware to extract authenticated user ID

    
        // Find the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (!user.is_verified) {
            return res.json({
                Success: false,
                Message: "User is not verified. Please verify your account before placing an order."
            });
        }

        const followingIds = user.following.map(follow => follow._id);

        // Initialize an array to store the posts with at least one like
        const feeds = [];

        // Loop through each user being followed
        for (const followingId of followingIds) {
            // Find posts from the user being followed
            // const post = await Post.find({ user: followingId });
            const posts = await Post.find({ user: followingId }).select('likesCount');
            // console.log(posts)
            
            // Filter the posts to include only those with at least one like
            const likedPosts = posts.filter(post => post.likesCount > 0);
            
            // Push the liked posts to the feeds array
            feeds.push(...likedPosts);
        }
        res.json({ success: true, message: 'Feeds fetched successfully', data:feeds});
   
};

const getfeedbydislikes = async (req, res) => {
    const userId = req.params.id; // Assuming you have middleware to extract authenticated user ID

    
        // Find the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (!user.is_verified) {
            return res.json({
                Success: false,
                Message: "User is not verified. Please verify your account before placing an order."
            });
        }
        const followingIds = user.following.map(follow => follow._id);

        // Initialize an array to store the posts with at least one like
        const feeds = [];

        // Loop through each user being followed
        for (const followingId of followingIds) {
            // Find posts from the user being followed
            // const post = await Post.find({ user: followingId });
            const posts = await Post.find({ user: followingId }).select('dislikesCount');
            // console.log(posts)
            
            // Filter the posts to include only those with at least one like
            const dislikedPosts = posts.filter(post => post.dislikesCount > 0);
            
            // Push the liked posts to the feeds array
            feeds.push(...dislikedPosts);
        }
        res.json({ success: true, message: 'Feeds fetched successfully', data:feeds});
   
};

const getfeedbycomment = async (req, res) => {
    const userId = req.params.id; // Assuming you have middleware to extract authenticated user ID

    
        // Find the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (!user.is_verified) {
            return res.json({
                Success: false,
                Message: "User is not verified. Please verify your account before placing an order."
            });
        }

        const followingIds = user.following.map(follow => follow._id);

        // Initialize an array to store the posts with at least one like
        const feeds = [];

        // Loop through each user being followed
        for (const followingId of followingIds) {
            // Find posts from the user being followed
            // const post = await Post.find({ user: followingId });
            const posts = await Post.find({ user: followingId }).select('comments');

            // console.log(posts.comments)
            
            // Filter the posts to include only those with at least one like
            const commentpost = posts.filter(post => post.comments.length > 0);
            
            // Push the liked posts to the feeds array
            feeds.push(...commentpost);
        }
        res.json({ success: true, message: 'Feeds fetched successfully', data:feeds});
   
};

module.exports = {
    getFeeds,
    getfeedbylikes,
    getfeedbydislikes,
    getfeedbycomment
};
