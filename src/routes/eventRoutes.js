import { Router } from "express";
import eventController from "../controller/eventController.js";

const { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent } =
  eventController;

const router = Router();

// Routes for Event CRUD operations
router.post("/", createEvent); // Create Event
router.get("/", getAllEvents); // Get all Events
router.get("/:id", getEventById); // Get Event by ID
router.put("/:id", updateEvent); // Update Event by ID
router.delete("/:id", deleteEvent); // Delete Event by ID

export default router;
