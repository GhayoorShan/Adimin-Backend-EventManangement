import { Schema, model } from "mongoose";

const agendaSchema = new Schema(
  {
    topic: {
      type: String,
      required: true,
    },
    photo: {
      type: String, // URL for the optional photo
      required: false,
    },
    theme: {
      type: String,
      required: true,
    },
    speakers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Speaker", // Reference to the Speaker model
      },
    ],
    event: {
      type: Schema.Types.ObjectId,
      ref: "Event", // Reference to the Event model
      required: true,
    },
    date: {
      type: Date,
      required: true, // The date of the agenda session
    },
    startTime: {
      type: String, // Time in HH:mm format (string)
      required: true, // Start time of the session
    },
    endTime: {
      type: String, // Time in HH:mm format (string)
      required: true, // End time of the session
    },
    location: {
      type: String, // Location of the session
      required: false, // Optional field for the session location
    },
    hostedBy: {
      name: {
        type: String, // Name of the company hosting the session
        required: false,
      },
      logo: {
        type: String, // URL for the company's logo
        required: false,
      },
    },
    remarks: {
      type: String, // Optional remarks about the session
      required: false,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

const Agenda = model("Agenda", agendaSchema);
export default Agenda;
