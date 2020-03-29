//require npm packages express, morgan, mongoose and path.
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
//establishting port 3000. 
const PORT = process.env.PORT || 3000;
//requiring the database in models folder. 
const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });
//linking to the index.html file in public folder. 
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});
//linking to the exercise.html file in the public folder. 
app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/exercise.html"));
});
//linking to the stats.html file in the public folder. 
app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/stats.html"));
});
//setting up a post route for workouts. 
app.post("/api/workouts", (req, res) => {
    db.Workout.create(req.body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});
//setting up the put route for workouts. 
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
//setting up a get route for workouts. 
app.get("/api/workouts", (req, res) => {
    db.Workout.find()
    .then(dbWorkouts => {
      res.json(dbWorkouts);
    })
    .catch(err => {
      res.json(err);
    });
})
//setting up a get route and setting a limit of 7 workouts. 
app.get("/api/workouts/range", (req, res) => {
  db.Workout.find({}).limit(7)
  .then(dbWorkouts => {
    res.json(dbWorkouts);
  })
  .catch(err => {
    res.json(err);
  });
})
//listening for the port. 
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });