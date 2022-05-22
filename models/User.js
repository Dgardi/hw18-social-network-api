const { Schema, model} = require('mongoose');

// Referenced Models lesson 18.1.21

// Schema to create the User model
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        match: [/.+@.+\..+/]
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

// Create a virtual property 'friendCount' that gets the amount of friends 
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// Initialize our User model
const User = model('User', userSchema);

module.exports = User;