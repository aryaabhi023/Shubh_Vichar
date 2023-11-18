const express = require("express");
const router = express.Router();
const { ideas, Validate } = require("../model/idea");

//Get all
router.get("/", async (req, res) => {
  try {
    const all_ideas = await ideas.find().sort({ Date: -1 });
    res.send(all_ideas);
  } catch (error) {
    res.send("something is wrong");
  }
});

//Getting particular ideas with id
router.get("/:id", async (req, res) => {
  const idea = await ideas.findById(req.params.id);
  if (!idea) {
    res.status(404).send("Not Found...");
    return;
  }
  res.send(idea);
});

//Post idea
router.post("/", async (req, res) => {
  const { error } = Validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const idea = new ideas({
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username,
  });
  await idea.save();
  res.send(idea);
});

//Update the idea
router.put("/:id", async (req, res) => {
  const { error } = Validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const idea = await ideas.findByIdAndUpdate(
    req.params.id,
    { tag: req.body.tag, text: req.body.text },
    { new: true }
  );
  if (!idea) {
    res.status(404).send("Not found..");
    return;
  }
  res.send(idea);
});

//Delete the idea
router.delete("/:id", async (req, res) => {
  try {
    const idea = await ideas.findByIdAndRemove(req.params.id);
    if (!idea) {
      res.status(404).send("Not found..");
      return;
    }
    res.send(idea);
  } catch (err) {
    console.log("Not Found");
  }
});

module.exports = router;
