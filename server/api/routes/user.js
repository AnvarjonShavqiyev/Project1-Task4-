const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../modules/user");

function getTime() {
  const currentDateAndTime = new Date();
  const year = currentDateAndTime.getFullYear();
  const month = currentDateAndTime.getMonth() + 1;
  const day = currentDateAndTime.getDate();
  const hours = currentDateAndTime.getHours();
  const minutes = currentDateAndTime.getMinutes();
  const seconds = currentDateAndTime.getSeconds();
  const formattedDateAndTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return formattedDateAndTime;
}

router.get("/", async (req, res, next) => {
  try {
    const result = await User.find().exec();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
});

router.get("/:userId", async (req, res, next) => {
  const id = req.params.userId;
  try {
    const doc = await User.findById(id).exec();
    res.status(200).json(doc);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.post("/login", (req, res, next) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err || !result) {
          return res.status(401).json({
            message: "Auth failed",
            error: err,
          });
        }
        user.lstLogTime = getTime();
        user.save();
        const token = jwt.sign(
          {
            email: user.email,
            userId: user._id,
          },
          process.env.JWT_KEY,
          {
            expiresIn: "2h",
          }
        );
        res.status(200).json({
          message: "Auth successful",
          userId: user._id,
          token: token,
        });
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.post("/signup", async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email }).exec();
    if (existingUser) {
      return res.status(422).json({
        message: "Mail exists!",
      });
    }
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      email: req.body.email,
      password: hash,
      lstLogTime: getTime(),
      regTime: getTime(),
      status: true,
    });

    const result = await user.save();
    res.status(201).json({
      message: "User created",
      username: req.body.name,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
});

router.patch("/:userId", async (req, res, next) => {
  try {
    const id = req.params.userId;
    const updates = {
      status: req.body.status,
    };
    const options = { new: true };
    const result = await User.findByIdAndUpdate(id, updates, options);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
});

router.delete("/:userId", async (req, res, next) => {
  try {
    const result = await User.findByIdAndDelete({
      _id: req.params.userId,
    }).exec();
    res.status(200).json({
      message: "User deleted",
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});

module.exports = router;
