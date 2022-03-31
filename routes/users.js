const User = require("../models/user.model");
const validate = require("../models/user.model");
const _ = require("lodash");
const express = require("express");
const { default: jwtDecode } = require("jwt-decode");
const router = express.Router();

router.post("/check", async (req, res) => {
  console.log(req.body);

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const user = await User.findOne({ email: req.body.email });

  if (user) {
    res.send(true);
  } else {
    res.send(false);
  }
});
router.patch("/updateUserLocation/:email", async (req, res) => {
  const token = req.header("x-auth-token");
  if (!token)
    try {
      const decoded = jwtDecode(token);
      if (!decoded) {
        return res.status(401).send("Access denied. Invalid token");
      }
    } catch (ex) {
      res.status(400).send("Invalid token.");
    }
  console.log(req.params.email);
  const email = req.params.email;
  const filter = { email: email };
  console.log(filter);
  console.log(req.body.lat);
  const updatedUser = await User.findOneAndUpdate(
    filter,
    {
      temperature: req.body.temperature,
      symptoms: req.body.symptoms,
      location: {
        lat: req.body.lat,
        lng: req.body.lng,
      },
    },
    {
      new: true,
    }
  );
  if (!updatedUser)
    return res.status(404).send("The user with the given email was not found.");

  res.send(updatedUser);
});
router.patch("/updateUserInfo/:email", async (req, res) => {
  const token = req.header("x-auth-token");
  if (!token)
    try {
      const decoded = jwtDecode(token);
      if (!decoded) {
        return res.status(401).send("Access denied. Invalid token");
      }
    } catch (ex) {
      res.status(400).send("Invalid token.");
    }
  const email = req.params.email;
  const filter = { email: email };

  const updatedUser = await User.findOneAndUpdate(
    filter,
    {
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender,
    },
    {
      new: true,
    }
  );
  if (!updatedUser)
    return res.status(404).send("The user with the given email was not found.");

  res.send(updatedUser);
});
router.post("/getUser", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const user = await User.findOne({ email: req.body.email });
  res.send(user);
});
router.get("/getAll", async (req, res) => {
  const users = await User.find({});
  let filteredUsers = [];
  for (var i = 0; i < users.length; i++) {
    if (users[i].location.lat !== "") {
      filteredUsers.push(users[i]);
    }
  }
  res.send(filteredUsers);
});

router.post("/register", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(_.pick(req.body, ["name", "email", "location"]));

  await user.save();

  // const token = user.generateAuthToken();
  res
    // .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
