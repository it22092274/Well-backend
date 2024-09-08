export interface IUser {
  name: string;
  email: string; // Ensure email is included here
  password: string;
  imagepath: string | null;
  age: number;
  address: string;
  phone: string;
  number_of_pregnancy_days: number;
  delivarydate: string;
  pregnancydate: string;
  currentmonth: string;
  preferred_clinic: string;
  allergies: string[];
  assistant: string;
}
