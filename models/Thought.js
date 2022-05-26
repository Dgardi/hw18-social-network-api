const { Schema, model, Types} = require('mongoose');
const moment = require('moment');

// Ref: Lesson 18.1.(12,18, 21, 23)
// Reaction is not it's own Model, but used as the 'reaction' field's sub document schema"
// toughtSchema defines shape for reaction sub document

const reactionSchema = new Schema ({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: dateFormat => moment(dateFormat).format("MMM Do YY")
    }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);


const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: dateFormat => moment(dateFormat).format("MMM Do YY")
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
    },
    {
        toJON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// Create a virtual property 'reactionCount' that gets the amount of reactions.  
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// Initialize our Thought Model
const Thought = model('Thought', thoughtSchema)

module.exports = Thought;