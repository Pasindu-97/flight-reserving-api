import { Flight } from "../entity/flight";
import { User } from "../entity/user";
import { UserObject } from "./user.services";

export type FlightObject = {
  id: string;
  flightName: string;
  departure: string;
  destination: string;
  date: string;
  time: string;
  passengers: User[];
};

export const listFlights = async (): Promise<FlightObject[]> => {
  return await Flight.find();
};

export const getFlightById = async (
  id: string
): Promise<FlightObject | null> => {
  return Flight.findOneBy({
    id: id,
  });
};

export const getFlightByName = async (
  flightName: string
): Promise<FlightObject | null> => {
  return Flight.findOneBy({
    flightName: flightName,
  });
};

export const createFlight = async (
  flight: Omit<FlightObject, "id">
): Promise<FlightObject> => {
  const { flightName, departure, destination, date, time, passengers } = flight;
  const newFlight = new Flight();
  newFlight.flightName = flightName;
  newFlight.departure = departure;
  newFlight.destination = destination;
  newFlight.date = date;
  newFlight.time = time;
  newFlight.passengers = passengers;
  return newFlight.save();
};

export const updateFlight = async (
  flight: Omit<FlightObject, "id">,
  id: string
): Promise<FlightObject> => {
  const { flightName, departure, destination, date, time, passengers } = flight;
  const flightToUpdate = await Flight.findOneBy({ id: id });
  if (!flightToUpdate) {
    throw new Error("Student not found");
  }
  flightToUpdate.flightName = flightName;
  flightToUpdate.departure = departure;
  flightToUpdate.destination = destination;
  flightToUpdate.date = date;
  flightToUpdate.time = time;
  flightToUpdate.passengers = passengers;
  return flightToUpdate.save();
};

export const deleteFlight = async (id: string): Promise<void> => {
  const flightToDelete = await Flight.findOneBy({ id: id });
  if (!flightToDelete) {
    throw new Error("Student not found");
  }
  flightToDelete.remove();
};
