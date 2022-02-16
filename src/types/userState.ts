export interface UserState {
  _id: Number;
  fullName: String;
  email: String;
  password: String;
  _body: (email: string, password: string) => void;
}
