export interface UserSignData {
  name: string;
  // email: string;
  password: string;
  study_level: 1 | 2 | 3;
  department: "scientific" | "literary";
  phone: string;
  parent_phone: string;
}