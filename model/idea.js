const Joi = require("joi");
const mongoose = require("mongoose");

const ideaSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  Date: {
    type: Date,
    default: Date.now,
  },
});

const ideas = mongoose.model("ideas", ideaSchema);

function Validate(content) {
  const Schema = Joi.object({
    text: Joi.string().required(),
    tag: Joi.string().required().min(3).max(30),
    username: Joi.string().required().min(3).max(30),
  });
  return Schema.validate(content);
}

exports.ideas = ideas;
exports.Validate = Validate;
