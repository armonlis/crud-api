export interface IUpdatedUser {
  username?: string,
  age?: number,
  hobbies?: string[]
};

export interface IAddedUser {
  username: string,
  age: number,
  hobbies: string[]
};

export interface IUser extends IAddedUser {
  id: string
};

export interface IResponse {
  status?: number,
  statusMes?: string,
  data?: IUser | IUser[] | null
  sendRes: boolean,
};

export interface IUsersMethods {
  addUser: (user: IAddedUser) => IUser,
  getUsers: () => IUser[],
  getUser: (id: IUser['id']) => IUser,
  deleteUser: (id: IUser['id']) => void,
  updateUser: (id: IUser['id'], newData: IUpdatedUser) => IUser;
  isExist: (id: IUser['id']) => boolean;
};