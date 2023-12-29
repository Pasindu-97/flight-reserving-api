import { Flight } from "../entity/flight";
import { FlightUser } from "../entity/flightUser";
import { User } from "../entity/user";
import { UserObject } from "./user.services";
import * as FlightService from "../services/flight.services";
import * as UserService from "../services/user.services";

export type FlightUserObject = {
  id: string;
  flightId: string;
  userId: string;
  numberOfSeats: number;
  cost: number;
};
export type ReservedFlightUserObject = {
  createdAt: Date;
  flightName: string;
  numberOfSeats: number;
  cost: number;
};
export const listFlightUsers = async (): Promise<FlightUser[]> => {
  return await FlightUser.find();
};

export const getFlightUserByUserId = async (
  userId: string
): Promise<ReservedFlightUserObject[] | null> => {
  const flightUsers = await FlightUser.find({
    where: {
      userId: userId,
    },
    relations: ["flight"],
  });

  if (!flightUsers || flightUsers.length === 0) {
    return null;
  }

  const reservedFlightUsers: ReservedFlightUserObject[] = flightUsers.map(
    (flightUser) => ({
      createdAt: flightUser.createdAt,
      flightName: flightUser.flight.flightName,
      numberOfSeats: flightUser.numberOfSeats,
      cost: flightUser.cost,
    })
  );

  return reservedFlightUsers;
};

export const createFlightUser = async (
  flightUser: Omit<FlightUserObject, "id">
): Promise<FlightUserObject | null> => {
  const { flightId, userId, numberOfSeats, cost } = flightUser;
  const newFlightUser = new FlightUser();
  newFlightUser.flightId = flightId;
  newFlightUser.userId = userId;
  newFlightUser.numberOfSeats = numberOfSeats;
  newFlightUser.cost = cost;
  return await newFlightUser.save();
};

export const deleteFlightUser = async (id: string): Promise<void> => {
  const flightUserToDelete = await FlightUser.findOneBy({ id: id });
  if (!flightUserToDelete) {
    throw new Error("FlightUSer not found");
  }
  flightUserToDelete.remove();
};
