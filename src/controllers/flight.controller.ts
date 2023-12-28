import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import * as FlightService from "../services/flight.services";

// GET: List of all flights
export const getFlights = async (request: Request, response: Response) => {
  try {
    const flights = await FlightService.listFlights();
    return response.status(200).json(flights);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
};

// GET: A single flight by ID
export const getFlightById = async (request: Request, response: Response) => {
  const id: string = request.params.id;
  try {
    const flight = await FlightService.getFlightById(id);
    if (flight) {
      return response.status(200).json(flight);
    }
    return response.status(404).json("Flight could not be found");
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
};

// GET: A single flight by Nme
export const getFlightByName = async (request: Request, response: Response) => {
  const name: string = request.params.name;
  try {
    const flight = await FlightService.getFlightByName(name);
    if (flight) {
      return response.status(200).json(flight);
    }
    return response.status(404).json("Flight could not be found");
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
};

// POST: Create a flight
export const createFlight = async (request: Request, response: Response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }
  try {
    const flight = request.body;
    const newFlight = await FlightService.createFlight(flight);
    return response.status(201).json(newFlight);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
};

// PUT: Updating a flight
export const updateFlight = async (request: Request, response: Response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }
  const id: string = request.params.id;
  try {
    const flight = request.body;
    const updateFlight = await FlightService.updateFlight(flight, id);
    return response.status(200).json(updateFlight);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
};

// DELETE: Delete a flight based on the id
export const deleteFlight = async (request: Request, response: Response) => {
  const id: string = request.params.id;
  try {
    await FlightService.deleteFlight(id);
    return response.status(204).json("Flight has been successfully deleted");
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
};
