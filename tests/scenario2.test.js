import request from "supertest";
import server from "../src/js/server";
import { validate, v4 as uuid } from "uuid";

describe("The deep test of the method GET.", () => {
  
  const serv = request(server);
  const addedUser = {username: "USER", age: 33, hobbies: ["beer", "girls"]};
  let userId;
  
  test("The first GET request must return empty array.", async () => {
    const response = await serv.get("/api/users");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body).toHaveLength(0);
  });

  test("Add new user.", async () => {
    const response = await serv.post("/api/users").send(JSON.stringify(addedUser));
    expect(response.status).toBe(201);
    userId = response.body.id;
  });

  test("Get user by id and check object's properties.", async () => {
    const response = await serv.get(`/api/users/${userId}`).expect(200);
    expect(typeof response.body).toEqual("object");
    expect(response.body.username).toEqual(addedUser.username);
    expect(response.body.age).toEqual(addedUser.age);
    expect(response.body.hobbies).toEqual(addedUser.hobbies);
    expect(validate(response.body.id)).toBeTruthy;
  });

  test("Trying to get the user with not UUID receives error 400.", async () => {
    const response = await serv.get(`/api/users/userId-333-4445-6666`).expect(400);
  });

  test("Trying to get the user with not existing UUID receives error 404.", async () => {
    const response = await serv.get(`/api/users/${uuid()}`).expect(404);
  });

});