export interface UserAccountState {
  _id: Number;
  userEmail: String;
  currency: String;
  value: {
    $numberDecimal: String;
  };
}
