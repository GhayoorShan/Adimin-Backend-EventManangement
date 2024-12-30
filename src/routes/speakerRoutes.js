import { Router } from "express";
import speakerController from "../controller/speakerController.js";

const {
  createSpeaker,
  getAllSpeakers,
  getSpeakerById,
  updateSpeaker,
  deleteSpeaker,
} = speakerController;

const router = Router();

// Routes for Speaker CRUD operations
router.post("/", createSpeaker); // Create Speaker
router.get("/", getAllSpeakers); // Get all Speakers
router.get("/:id", getSpeakerById); // Get Speaker by ID
router.put("/:id", updateSpeaker); // Update Speaker by ID
router.delete("/:id", deleteSpeaker); // Delete Speaker by ID

export default router;
