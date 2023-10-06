/* export interface User {
  name: string;
  email: string;
} */

export interface LoginUser {
  name: string;
  email: string;
  password: string;
}

export interface LoggedInUser {
  _id: string;
  name: string;
  email: string;
  lastLogin: string;
}

export interface TokenUser {
  id: string;
  name: string;
  email: string;
}
