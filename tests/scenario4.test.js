import request from "supertest";
import server from "../src/js/server";
import { validate, v4 as uuid } from "uuid";

describe("The deep test of the method PUT.", () => {
  
  const serv = request(server);
  const addedUser = { username: "USER", age: 33, hobbies: ["beer", "girls"] };
  const changeUserName = { username: "NEW_NAME" };
  const changeUserAge = { age: 13 };
  const changeUserHobbies = { hobbies: ["flowers"] }
  let userId;
    
  test("Add new user with valid user object and check returned object.", async () => {
    const response = await serv.post("/api/users").send(JSON.stringify(addedUser));
    expect(response.status).toBe(201);
    expect(typeof response.body).toEqual("object");
    expect(response.body.username).toEqual(addedUser.username);
    expect(response.body.age).toEqual(addedUser.age);
    expect(response.body.hobbies).toEqual(addedUser.hobbies);
    expect(validate(response.body.id)).toBeTruthy;
    userId = response.body.id;
  });

  test("Change the user's name and check returned object.", done => {
    serv.put(`/api/users/${userId}`).send(JSON.stringify(changeUserName))
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(typeof response.body).toEqual("object");
        expect(response.body.username).toEqual(changeUserName.username);
        expect(response.body.age).toEqual(addedUser.age);
        expect(response.body.hobbies).toEqual(addedUser.hobbies);
        expect(response.body.id).toEqual(userId);
        done()
      });
  });

  test("Change the user's age and check returned object.", done => {
    serv.put(`/api/users/${userId}`).send(JSON.stringify(changeUserAge))
      .then(response => {
        expect(response.statusCode).toEqual(200);
        expect(response.body.username).toEqual(changeUserName.username);
        expect(response.body.age).toEqual(changeUserAge.age);
        expect(response.body.hobbies).toEqual(addedUser.hobbies);
        expect(response.body.id).toEqual(userId);
        done()
      });
  });

  test("Change the user's hobbies and check returned object.", done => {
    serv.put(`/api/users/${userId}`).send(JSON.stringify(changeUserHobbies))
      .then(response => {
        expect(response.statusCode).toEqual(200);
        expect(response.body.username).toEqual(changeUserName.username);
        expect(response.body.age).toEqual(changeUserAge.age);
        expect(response.body.hobbies).toEqual(changeUserHobbies.hobbies);
        expect(response.body.id).toEqual(userId);
        done()
      });
  });

  
});