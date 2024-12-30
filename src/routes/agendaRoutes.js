import { Router } from "express";
import agendaController from "../controller/agendaController.js";

const {
  createAgenda,
  getAllAgendas,
  getAgendaById,
  updateAgenda,
  deleteAgenda,
} = agendaController;

const router = Router();

// Create Agenda
router.post("/", createAgenda);

// Get all Agendas for a specific Event
router.get("/:eventId", getAllAgendas);

// Get a single Agenda by ID
router.get("/:id", getAgendaById);

// Update Agenda by ID
router.put("/:id", updateAgenda);

// Delete Agenda by ID
router.delete("/:id", deleteAgenda);

export default router;
