import Speaker from "../models/speakerModel.js";
import createResponse from "../utils/responseHelper.js";

// Create Speaker
const createSpeaker = async (req, res) => {
  try {
    const { name, bio, photo, theme } = req.body;

    // Create a new Speaker document
    const newSpeaker = new Speaker({
      name,
      bio,
      photo,
      theme,
    });

    // Save the Speaker to the database
    await newSpeaker.save();

    return res
      .status(201)
      .json(createResponse(1, "Speaker created successfully", newSpeaker));
  } catch (error) {
    return res
      .status(500)
      .json(createResponse(0, "Error creating speaker", null, error.message));
  }
};

// Get All Speakers
const getAllSpeakers = async (req, res) => {
  try {
    // Retrieve all speakers without populating the "event" field since speakers are independent
    const speakers = await Speaker.find();
    return res
      .status(200)
      .json(createResponse(1, "Speakers retrieved successfully", speakers));
  } catch (error) {
    return res
      .status(500)
      .json(
        createResponse(0, "Error retrieving speakers", null, error.message)
      );
  }
};

// Get Speaker by ID
const getSpeakerById = async (req, res) => {
  try {
    const { id } = req.params;
    const speaker = await Speaker.findById(id);

    if (!speaker) {
      return res.status(404).json(createResponse(0, "Speaker not found"));
    }

    return res
      .status(200)
      .json(createResponse(1, "Speaker retrieved successfully", speaker));
  } catch (error) {
    return res
      .status(500)
      .json(createResponse(0, "Error retrieving speaker", null, error.message));
  }
};

// Update Speaker
const updateSpeaker = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, bio, photo, theme } = req.body;

    const updatedSpeaker = await Speaker.findByIdAndUpdate(
      id,
      { name, bio, photo, theme },
      { new: true }
    );

    if (!updatedSpeaker) {
      return res.status(404).json(createResponse(0, "Speaker not found"));
    }

    return res
      .status(200)
      .json(createResponse(1, "Speaker updated successfully", updatedSpeaker));
  } catch (error) {
    return res
      .status(500)
      .json(createResponse(0, "Error updating speaker", null, error.message));
  }
};

// Delete Speaker
const deleteSpeaker = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSpeaker = await Speaker.findByIdAndDelete(id);

    if (!deletedSpeaker) {
      return res.status(404).json(createResponse(0, "Speaker not found"));
    }

    return res
      .status(200)
      .json(createResponse(1, "Speaker deleted successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(createResponse(0, "Error deleting speaker", null, error.message));
  }
};

export default {
  createSpeaker,
  getAllSpeakers,
  getSpeakerById,
  updateSpeaker,
  deleteSpeaker,
};
