// requiring mongoose.
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
//creating the workout schema. 
const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: () => new Date()

  },
  exercises: [
      {
          type: {
            type: String,
            trim: true,
          },
         
          name: String,
          duration: Number,
          weight: Number,
          reps: Number,
          sets: Number,
          distance: Number
      }
  ]
});

const Workout = mongoose.model("Workout", WorkoutSchema);
//exporting workout. 
module.exports = Workout;