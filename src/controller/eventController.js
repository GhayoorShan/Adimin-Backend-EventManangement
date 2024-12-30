import Event from "../models/eventModel.js"; // Import Event model
import createResponse from "../utils/responseHelper.js";

// Create Event
const createEvent = async (req, res) => {
  try {
    const { name, year, fromDate, toDate, speakers } = req.body;

    // Create a new Event document
    const newEvent = new Event({
      name,
      year,
      fromDate,
      toDate,
      speakers,
    });

    // Save the Event to the database
    await newEvent.save();

    return res
      .status(201)
      .json(createResponse(1, "Event created successfully", newEvent));
  } catch (error) {
    return res
      .status(500)
      .json(createResponse(0, "Error creating event", null, error.message));
  }
};

// Get All Events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("speakers");
    return res
      .status(200)
      .json(createResponse(1, "Events retrieved successfully", events));
  } catch (error) {
    return res
      .status(500)
      .json(createResponse(0, "Error retrieving events", null, error.message));
  }
};

// Get Event by ID
const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id).populate("speakers");

    if (!event) {
      return res.status(404).json(createResponse(0, "Event not found"));
    }

    return res
      .status(200)
      .json(createResponse(1, "Event retrieved successfully", event));
  } catch (error) {
    return res
      .status(500)
      .json(createResponse(0, "Error retrieving event", null, error.message));
  }
};

// Update Event
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, year, fromDate, toDate, speakers } = req.body;

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { name, year, fromDate, toDate, speakers },
      { new: true } // Return the updated document
    );

    if (!updatedEvent) {
      return res.status(404).json(createResponse(0, "Event not found"));
    }

    return res
      .status(200)
      .json(createResponse(1, "Event updated successfully", updatedEvent));
  } catch (error) {
    return res
      .status(500)
      .json(createResponse(0, "Error updating event", null, error.message));
  }
};

// Delete Event
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return res.status(404).json(createResponse(0, "Event not found"));
    }

    return res
      .status(200)
      .json(createResponse(1, "Event deleted successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(createResponse(0, "Error deleting event", null, error.message));
  }
};

export default {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
