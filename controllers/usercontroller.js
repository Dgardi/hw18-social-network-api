const { User } = require('../models')

module.exports = {
// Get All Users
getUsers(req, res) {
    User.find().then((user) => res.json(user)).catch((err) => res.status(500).json(err));
},
// Get A User
getSingleUser(req, res) {
    User.findOne({_id: req.params.id })
    .select('-__v')
    .then((user) => 
        !user
        ? res.status(404).json({ message: 'No User with that ID'})
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err))
},
// Create A User
createUser(req, res){
    User.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
    });
},
//Update A User
updateUser(req, res) {
    User.findOneAndUpdate(
        {_id: req.params.id},
        {$set: req.body},
        {runValidators: true, new:true}
    )
    .then((user) =>
        !user
            ? res.status(404).json({ message: 'No user with this id!'})
            : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
},
//Delete A User
deleteUser(req,res) {
    User.findOneAndDelete({ _id: req.params.id})
    .then((user) =>
    !user
        ?res.status(404).json({ message: ' No user with this id!'})
        : User.deleteMany({ _id: { $in: user.username} }))
},
//Create A Friend
createFriend(req, res) {
    User.findOneAndUpdate({
        _id: req.params.id
    }, {
        $addToSet: {
            friends: req.params.friendId
        }
    },)
    // }, {
    //     runValidators: true,
    //     new: true
    // })
    
    .then((user) =>
        !user
            ? res.status(400).json({ message: ' No friend with this id!'})
            : res.json(user)
     )
     .catch((err) => res.status(500).json(err));
},
//Delete a Friend
deleteFriend(req,res) {
    User.findOneAndDelete({ _id: req.params.id})
    .then((user) =>
    !user
        ?res.status(404).json({ message: ' No user with this id!'})
        : User.deleteMany({ _id: { $in: user.username} }))
},
 };