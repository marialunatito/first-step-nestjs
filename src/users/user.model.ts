export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Response {
  message?: string;
  error?: string;
  data?: User | User[];
}
