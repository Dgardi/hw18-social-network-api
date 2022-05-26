const { Thought, User } = require('../models')

module.exports = {
// Get All Thoughts
getThoughts(req, res) {
    Thought.find().then((thought) => res.json(thought)).catch((err) => res.status(500).json(err));
},
// Get A Thought
getSingleThought(req, res) {
    Thought.findOne({_id: req.params.id })
    .select('-__v')
    .then((thought) => 
        !thought
        ? res.status(404).json({ message: 'No Thought with that ID'})
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err))
},
// Create A Thought
createThought(req, res){
    Thought.create(req.body)
    .then((thought) => res.json(thought))
    .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
    });
},
//Update A Thought
updateThought(req, res) {
    Thought.findOneandUpdate(
        {_id: req.params.id},
        {$set: req.body},
        {runValidators: true, new:true}
    )
    .then((thought) =>
        !thought
            ? res.status(404).json({ message: 'No thought with this id!'})
            : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
},
//Delete A Thought
deleteThought(req,res) {
    Thought.findOneAndDelete({ _id: req.params.id})
    .then((thought) =>
    !thought
        ?res.status(404).json({ message: ' No thought with this id!'})
        : User.deleteMany({ _id: { $in: thought.username} }))
},
//! Create a Reaction

createReaction({body,params}, res) {
    Thought.findOneAndUpdate(
        {_id: params.thoughtId},
        {$push:{reactions: body}},
        { new: true, runValidators: true}
    )
    .then((thought) => res.json(thought))
    .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
    });
},
// Delete a Reaction
deleteReaction(req, res) {
    Thought.findOneAndDelete(
        {_id: req.params.thoughtId},
        {$pull:{reactions: {reactionId: req.params.reactionId}}},
        { new: true}
    )
    .then((thought) => res.json(thought))
    .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
    });
},
};
