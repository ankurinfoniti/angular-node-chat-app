export interface User {
  name: string;
  email: string;
}

export interface LoginUser extends User {
  password: string;
}

export interface LoggedInUser extends User {
  _id: string;
  lastLogin: string;
}
