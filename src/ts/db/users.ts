import { v4 as uuid } from 'uuid';
import { stdout } from 'process';
import { IUser, IUpdatedUser, IAddedUser, IUsersMethods } from "../interfaces.js"

export default function createUsersStorage(): IUsersMethods {
  if (createUsersStorage._isCreated) { stdout.write('\nThe users data base has been allready created.\n'); return; }
  createUsersStorage._isCreated = true;

  const users: IUser[] = [];
  let lastCheckedUser: IUser | null = null;

  stdout.write('\nThe users data base was created succesfully.\n');

  function addUser(user: IAddedUser): IUser {
    const id = uuid();
    const { username, age, hobbies } = user;
    users.push({
      id, username, age, hobbies,
    });
    return {
      id, username, age, hobbies,
    };
  }

  function getUsers(): IUser[] {
    return [...users];
  }

  function getUser(id: IUser['id']): IUser {
    return lastCheckedUser?.id === id ? {...lastCheckedUser} : { ...users.find((user) => user.id === id) };
  }

  function deleteUser(id: IUser['id']): IUser {
    users.splice(users.findIndex((user) => user.id === id), 1);
    return lastCheckedUser?.id === id ? {...lastCheckedUser} : { ...users.find((user) => user.id === id) };
  }

  function updateUser(id: IUser['id'], newData: IUpdatedUser): IUser {
    const user = users.find((user) => user.id === id);
    user.username = newData.username ?? user.username;
    user.age = newData.age ?? user.age;
    user.hobbies = newData.hobbies ?? user.hobbies;
    return { ...user };
  }

  function isExist(id: IUser['id']): boolean {
    lastCheckedUser = users.find((user) => user.id === id) ?? null;
    return !!lastCheckedUser;
  }

  return {
    addUser, getUsers, getUser, deleteUser, updateUser, isExist,
  };
}

createUsersStorage._isCreated = false;
