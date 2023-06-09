export interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  phoneNumber?: string;
  address?: string;
  dateOfBirth?: string;
  profilePicture?: string;
}