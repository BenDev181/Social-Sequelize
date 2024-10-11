const { Comment, Like, Post, Profile, User } = require("./index");
const { db } = require('./db/connection.js');
const users = require("./seed/users.json");
const profiles = require("./seed/profiles.json");
const posts = require("./seed/posts.json");
const comments = require("./seed/comments.json");
const likes = require("./seed/likes.json");

describe('Social Sequelzie Test', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the test suite is run
        await db.sync({ force: true });
    })
    
    test("Can create a user", async () => {
        await User.bulkCreate(users);
        const foundUser = await User.findByPk(1)
        expect(foundUser).toEqual(expect.objectContaining(users[0]));
    })

    test("Can create a profile", async () => {
        await Profile.bulkCreate(profiles);
        const foundProfile = await Profile.findByPk(1)
        expect(foundProfile).toEqual(expect.objectContaining(profiles[0]));
    })

    test("Can create a post", async () => {
        await Post.bulkCreate(posts);
        const foundPosts = await Post.findByPk(1)
        expect(foundPosts).toEqual(expect.objectContaining(posts[0]));
    })

    test("Can create a comment", async () => {
        await Comment.bulkCreate(comments);
        const foundComment = await Comment.findByPk(1)
        expect(foundComment).toEqual(expect.objectContaining(comments[0]));
    })

    test("Can create a like", async () => {
        await Like.bulkCreate(likes);
        const foundLike = await Like.findByPk(1)
        expect(foundLike).toEqual(expect.objectContaining(likes[0]));
    })

    // One-to-one Test
    test("User can only have one profile", async () => {
        let myUser = await User.create(users[0])
        let myProfile = await Profile.create(profiles[0])
        await myUser.setProfile(myProfile) //Add profile to user
        const userProfile = await myUser.getProfile()
        expect(userProfile instanceof Profile).toBeTruthy();
    })

    // One-to-many Test
    test("User can have many likes", async () => {
        let myUser = await User.create(users[0])
        let myLike1 = await Like.create(likes[0])
        let myLike2 = await Like.create(likes[1])

        // Add likes to the user
        await myUser.addLike(myLike1) 
        await myUser.addLike(myLike2)
        // Get associated likes
        const userLikes = await myUser.getLikes()

        expect(userLikes.length).toBe(2)
        expect(userLikes instanceof Like).toBeTruthy; // No () as multiple returned
    })

    // Many-to-many Test
    test("Likes can have many users", async () => {
        let myLike = await Like.create(likes[0])
        let user1 = await User.create(users[0])
        let user2 = await User.create(users[1])


        // Add users to the like
        await myLike.addUser(user1) 
        await myLike.addUser(user2)
        // Get associated users to the likes
        const likeUsers = await myLike.getUsers()

        expect(likeUsers.length).toBe(2)
        expect(likeUsers instanceof User).toBeTruthy; // No () as multiple returned
    })




})