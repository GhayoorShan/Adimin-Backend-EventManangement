import { Schema, model } from "mongoose";

const speakerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  photo: {
    type: String, // URL to the photo (optional)
    required: false,
  },
  // event: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Event",
  //   required: false,
  // },
  theme: {
    type: String,
    required: true,
  },
});

const Speaker = model("Speaker", speakerSchema);
export default Speaker;
