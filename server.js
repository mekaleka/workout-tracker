const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/exercise.html"));
});

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/stats.html"));
});

app.post("/api/workouts", (req, res) => {
    db.Workout.create(req.body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

app.put("/api/workouts/:id", (req, res) => {
  console.log("id: ", req.params.id);
  console.log("body: ", req.body)
    db.Workout.findByIdAndUpdate(
      req.params.id,
      {$push: {exercises: req.body} }
    )
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
})

app.get("/api/workouts", (req, res) => {
    db.Workout.find()
    .then(dbWorkouts => {
      res.json(dbWorkouts);
    })
    .catch(err => {
      res.json(err);
    });
})

app.get("/api/workouts/range", (req, res) => {
  db.Workout.find({}).limit(7)
  .then(dbWorkouts => {
    res.json(dbWorkouts);
  })
  .catch(err => {
    res.json(err);
  });
})

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });