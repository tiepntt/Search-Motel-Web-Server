import { Expose } from "class-transformer";

export class ContactDto {
  @Expose()
  id: number;
  @Expose()
  email: string;
  @Expose()
  phone: string;
  @Expose()
  phone2: string;
  @Expose()
  userId: number;
  @Expose()
  address: string;
}
