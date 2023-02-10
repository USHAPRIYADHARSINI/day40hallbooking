import express from "express";
import {
  bookRoomById,
  createRoom,
  getAllBookedRooms,
  getAllCustomerDetails,
  getAllRooms,
  getRoomById,
  saveCustomer,
} from "../services/room.services.js";

const router = express.Router();

router.post("/createroom", async function (req, res) {
  try {
    const { id, seats, amenities, pricePerHr } = req.body;

    const roomFromDb = await getRoomById(id);

    console.log(roomFromDb);

    if (roomFromDb) {
      res.send({ message: "Room already exists" });
      console.log("room already exist");
    } else {
      const newRoom = await createRoom({
        id: id,
        seats: seats,
        amenities: amenities,
        pricePerHr: pricePerHr,
        BookingStatus: false,
      });

      res.status(200).send(newRoom);
      console.log(newRoom);
    }
  } catch (error) {
    console.log("error occured", error);
  }
});

router.get("/getallrooms", async function (req, res) {
  try {
    const rooms = await getAllRooms(req); // viewing all rooms
    res.send(rooms);
    console.log(req.query);
  } catch (error) {
    console.log("error: ", error);
  }
});

router.get("/getallcustomerdetails", async function (req, res) {
  try {
    const rooms = await getAllCustomerDetails(); // viewing all rooms
    res.send(rooms);
    console.log(req.query);
  } catch (error) {
    console.log("error: ", error);
  }
});

router.get("/roombookingdetails", async function (req, res) {
  try {
    const rooms = await getAllBookedRooms(true); // viewing all rooms
    res.send(rooms);
    console.log(req.query);
  } catch (error) {
    console.log("error: ", error);
  }
});

// getting one room by id
router.get("/:id", async function (req, res) {
  try {
    const { id } = req.params;
    console.log(id);

    const roomFromDb = await getRoomById(id); // visiting a single room

    console.log(roomFromDb);

    res.status(200).send(roomFromDb);
    
  } catch (error) {
    res.status(400).send("error", error);
    console.log(error);
  }
});

router.post("/:id/bookroom", async function (req, res) {
  try {
    const { id } = req.params; // taking room id from params
    console.log(id);

    const { customerName, date, startTime, endTime } = req.body; // getting customer details from body

    const  bookedroom  = await getRoomById(id);
    console.log(bookedroom.BookingStatus); // finding if the room is already booked

    if (bookedroom.id == id && bookedroom.BookingStatus == true && bookedroom.date == date && 
      ((bookedroom.startTime <= startTime && bookedroom.endTime >= endTime) || // between already booked time
      (bookedroom.startTime >= startTime && bookedroom.endTime >= endTime) ||  // before start and before end of already booked time
      (bookedroom.startTime <= startTime && bookedroom.endTime <= endTime) ||  // after start and after end of already booked time
      (bookedroom.startTime >= startTime && bookedroom.endTime <= endTime)) ) {  // before start and after end of already booked time
      res.send("room not available / booked already");
    } else {
      const bookingStatus = await bookRoomById(id, {
        BookingStatus: true,
        customerName: customerName,
        date: date,
        startTime: startTime,
        endTime: endTime,
        id: id,
        status: "Booked",
      });

      const roomFromDb = await getRoomById(id);
      console.log(roomFromDb);      

      const customerDetails = await saveCustomer({...roomFromDb})

      console.log(customerDetails);

      res.status(200).send(customerDetails);
    }
  } catch (error) {
    res.status(400).send("error", error);
    console.log(error);
  }
});


export default router;
