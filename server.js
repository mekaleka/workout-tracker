const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/populatedb", { useNewUrlParser: true });

app.get("/stats", (req, res) => {
  db.Stat.find({})
    .then(dbStat => {
      res.json(dbStat);
    })
    .catch(err => {
      res.json(err);
    });
});

app.post("/submit", ({ body }, res) => {
  db.Stat.create(body)
    .then(({ _id }) => db.Stat.findOneAndUpdate({}, { $push: { stats: _id } }, { new: true }))
    .then(dbStats => {
      res.json(dbStats);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get("/populatedstats", (req, res) => {
  db.Stats.find({})
    .populate("exercise")
    .then(dbStats => {
      res.json(dbStats);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get("/workout", (req, res) => {
  db.Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

app.post("/submit", ({ body }, res) => {
  db.Workout.create(body)
    .then(({ _id }) => db.Workout.findOneAndUpdate({}, { $push: { stats: _id } }, { new: true }))
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get("/populatedstats", (req, res) => {
  db.Stats.find({})
    .populate("workout")
    .then(dbStats=> {
      res.json(dbStats);
    })
    .catch(err => {
      res.json(err);
    });
});

// app.get("/stats", (req, res) => {
//   db.Stats.find({})
//     .then(dbStats => {
//       res.json(dbStats);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

// app.post("/submit", ({ body }, res) => {
//   db.Stats.create(body)
//     .then(({ _id }) => db.Stats.findOneAndUpdate({}, { $push: { stats: _id } }, { new: true }))
//     .then(dbStats => {
//       res.json(dbStats);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });