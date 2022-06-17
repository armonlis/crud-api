import request from "supertest";
import server from "../src/js/server";

describe("Test main features.", () => {
  
  const serv = request(server);
  const addedUser = JSON.stringify({username: "USER", age: 33, hobbies: ["beer", "girls"]});
  let userId;
  
  test("The first GET request must return empty array.", async () => {
    const response = await serv.get("/api/users");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body).toHaveLength(0);
  });

  test("Add new user. (Method POST)", async () => {
    const response = await serv.post("/api/users").send(addedUser);
    expect(response.status).toBe(201);
    userId = response.body.id;
  });

  test("Get user by id. (Method GET)", async () => {
    const response = await serv.get(`/api/users/${userId}`);
    expect(response.status).toBe(200);
  });

  test("Change user. (Method PUT)", async () => {
    const response = await serv.put(`/api/users/${userId}`).send({...addedUser, age: 7}).expect(200);
  });

  test("Delete user. (Method DELETE)", async () => {
    const response = await serv.delete(`/api/users/${userId}`).expect(200);
  });

});