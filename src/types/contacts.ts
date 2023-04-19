export interface IContact {
  id: number;
  name: string;
  phone: string;
  date: string[];
  role: string;
  favorite: boolean;
  gender: 'male' | 'female';
  photo: string;
}
