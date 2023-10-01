export interface User {
  name: string;
  email: string;
}

export interface LoginUser extends User {
  password: string;
}
