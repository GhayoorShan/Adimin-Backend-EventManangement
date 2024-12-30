import Agenda from "../models/agendaModel.js";
import Event from "../models/eventModel.js";
import Speaker from "../models/speakerModel.js";
import createResponse from "../utils/responseHelper.js";

// Create Agenda
const createAgenda = async (req, res) => {
  try {
    const {
      topic,
      photo,
      theme,
      speakers = [], // Default to an empty array if not provided
      eventId,
      date,
      startTime,
      endTime,
      location,
      hostedBy,
      remarks,
    } = req.body;

    // Validate eventId
    if (!eventId) {
      return res
        .status(400)
        .json(createResponse(0, "Event ID is required", null));
    }

    // Create the agenda document
    const newAgenda = new Agenda({
      topic,
      photo,
      theme,
      speakers,
      event: eventId,
      date,
      startTime,
      endTime,
      location,
      hostedBy,
      remarks,
    });

    // Check if the event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json(createResponse(0, "Event not found", null));
    }
    // Save to the database
    await newAgenda.save();

    return res
      .status(201)
      .json(createResponse(1, "Agenda created successfully", newAgenda));
  } catch (error) {
    return res
      .status(500)
      .json(createResponse(0, "Error creating agenda", null, error.message));
  }
};

// Get All Agendas for an Event
const getAllAgendas = async (req, res) => {
  try {
    const { eventId } = req.params;

    // Find the agendas related to the event
    const agendas = await Agenda.find({ event: eventId })
      .populate("speakers") // Populate speaker details if any
      .populate("event"); // Populate event details

    if (!agendas) {
      return res
        .status(404)
        .json(createResponse(0, "No agendas found for this event"));
    }

    return res
      .status(200)
      .json(createResponse(1, "Agendas retrieved successfully", agendas));
  } catch (error) {
    return res
      .status(500)
      .json(createResponse(0, "Error retrieving agendas", null, error.message));
  }
};

// Get Agenda by ID
const getAgendaById = async (req, res) => {
  try {
    const { id } = req.params;
    const agenda = await Agenda.findById(id)
      .populate("speakers")
      .populate("event");

    if (!agenda) {
      return res.status(404).json(createResponse(0, "Agenda not found"));
    }

    return res
      .status(200)
      .json(createResponse(1, "Agenda retrieved successfully", agenda));
  } catch (error) {
    return res
      .status(500)
      .json(createResponse(0, "Error retrieving agenda", null, error.message));
  }
};

// Update Agenda
const updateAgenda = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      topic,
      photo,
      theme,
      speakers,
      eventId,
      date,
      startTime,
      endTime,
      location,
      hostedBy,
      remarks,
    } = req.body;

    // Check if the event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json(createResponse(0, "Event not found"));
    }

    const updatedAgenda = await Agenda.findByIdAndUpdate(
      id,
      {
        topic,
        photo,
        theme,
        speakers,
        event: eventId,
        date,
        startTime,
        endTime,
        location,
        hostedBy,
        remarks,
      },
      { new: true }
    );

    if (!updatedAgenda) {
      return res.status(404).json(createResponse(0, "Agenda not found"));
    }

    return res
      .status(200)
      .json(createResponse(1, "Agenda updated successfully", updatedAgenda));
  } catch (error) {
    return res
      .status(500)
      .json(createResponse(0, "Error updating agenda", null, error.message));
  }
};

// Delete Agenda
const deleteAgenda = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAgenda = await Agenda.findByIdAndDelete(id);

    if (!deletedAgenda) {
      return res.status(404).json(createResponse(0, "Agenda not found"));
    }

    return res
      .status(200)
      .json(createResponse(1, "Agenda deleted successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(createResponse(0, "Error deleting agenda", null, error.message));
  }
};

export default {
  createAgenda,
  getAllAgendas,
  getAgendaById,
  updateAgenda,
  deleteAgenda,
};
