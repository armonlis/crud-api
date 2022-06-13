import { v4 as uuid } from "uuid";
import { stdout } from "process";

type UsersMethods = {
  addUser: (user: IAddedUser) => IUser,
  getUsers: () => IUser[],
  getUser: (id: IUser["id"]) => IUser,
  deleteUser: (id: IUser["id"]) => void,
  updateUser: (id: IUser["id"], newData: IUpdatedUser) => IUser;
  isExist: (id: IUser["id"]) => boolean;
};

interface IUpdatedUser {
    username?: string,
    age?: number,
    hobbies?: string[]
  };

interface IAddedUser {
  username: string,
  age: number,
  hobbies: string[]
};

interface IUser extends IAddedUser {
  id: string
}

export function createUsersStorage(): UsersMethods  {
  if (this.__isCreated) { stdout.write("The users data base has allready created."); return; }
  this.__isCreated = true;

  const users: IUser[] = [];

  function addUser(user: IAddedUser): IUser {
    const id = uuid();
    const { username, age, hobbies } = user;
    users.push({id, username, age, hobbies});
    return {id, username, age, hobbies};
  };

  function getUsers(): IUser[] {
    return [...users];
  };

  function getUser(id: IUser["id"]): IUser {
    const user = users.find(user => user.id === id);
    return { ...user };
  };

  function deleteUser(id: IUser["id"]): IUser {
    const user = users.find(user => user.id === id);
    users.splice(users.findIndex(user => user.id === id), 1);
    return { ...user };  
  };

  function updateUser(id: IUser["id"], newData: IUpdatedUser): IUser {
    const user = users.find(user => user.id === id);
    user.username = newData.username ?? user.username;
    user.age = newData.age ?? user.age;
    user.hobbies = newData.hobbies ?? user.hobbies;
    return {...user};
  };

  function isExist(id: IUser["id"]): boolean {
    return users.findIndex(user => user.id === id) !== -1 ? true : false;
  };
   
  return {addUser, getUsers, getUser, deleteUser, updateUser, isExist}; 
}; 

createUsersStorage.__isCreated = false;