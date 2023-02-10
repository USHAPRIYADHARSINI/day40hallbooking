import { client } from "../index.js"

export async function createRoom(data) {
    return await client
        .db("mydb")
        .collection("room")
        .insertOne(data);
}

export async function saveCustomer(data) {
    return await client
        .db("mydb")
        .collection("customerdetails")
        .insertOne(data);
}

export async function getRoomById(id) {
    return await client
        .db("mydb")
        .collection("room")
        .findOne({ id: id });
}

export async function bookRoomById(id,data) {
    return await client
        .db("mydb")
        .collection("room")
        .updateOne({ id: id }, { $set: data });
}

export async function getAllRooms(request) {
    return await client
        .db("mydb")
        .collection("room")
        .find(request.query)
        .toArray();
}

export async function getAllBookedRooms(data) {
    return await client
        .db("mydb")
        .collection("room")
        .find({BookingStatus : data})
        .toArray();
}

export async function getAllCustomerDetails(data) {
    return await client
        .db("mydb")
        .collection("customerdetails")
        .find()
        .toArray();
}