import express from "express";
import { body } from "express-validator";

import * as FlightContoller from "../controllers/flight.controller";
import { AuthenticationMiddleware } from "../middlewares/auth.middleware";

export const flightRouter = express.Router();

flightRouter.get("/", FlightContoller.getFlights);

flightRouter.get("find/:id", FlightContoller.getFlightById);

flightRouter.post(
  "/",
  body("flightName").isString(),
  body("departure").isString(),
  body("destination").isString(),
  body("date").isString(),
  body("time").isString(),
  FlightContoller.createFlight
);

flightRouter.put(
  "/:id",
  AuthenticationMiddleware("ADMIN"),
  body("flightName").isString(),
  body("departure").isString(),
  body("destination").isString(),
  body("date").isString(),
  body("time").isString(),
  FlightContoller.updateFlight
);

flightRouter.delete(
  "/:id",
  AuthenticationMiddleware("ADMIN"),
  FlightContoller.deleteFlight
);

flightRouter.post(
  "/reserve",
  body("flightId").isString(),
  body("numberOfSeats").isNumeric(),
  FlightContoller.flightReserve
);

flightRouter.get("/reserve", FlightContoller.reservedFlights);
