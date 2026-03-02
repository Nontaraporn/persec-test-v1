export interface DataUserRegister {
  id: number;
  username: string;
  password: string;
  role: "customer" | "employee" | "admin";
  approved: boolean;
  registerDate: string;
}

export interface DataPackageItem {
  id: number;
  name: string;
  price: number;
  icon: string;
  createDate: string;
  createdBy: string;
  published: boolean;
}