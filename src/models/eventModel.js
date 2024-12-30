import { Schema, model } from "mongoose";

// Define the Event Schema
const eventSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    fromDate: {
      type: Date,
      required: true,
    },
    toDate: {
      type: Date,
      required: true,
    },
    speakers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Speaker", // Reference to the Speaker model
      },
    ],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Create and export the Event model
const Event = model("Event", eventSchema);
export default Event;
