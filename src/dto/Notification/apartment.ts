import { Expose, Type } from "class-transformer";
import { Apartment } from "../../entity/apartment/apartment";

import { User } from "../../entity/User/User";

export class NotificationInput {
  context: string;
  apartment: Apartment;
  creat_at?: Date;
  userCreate: User;
  userSubscribe: User[];
}
export class NotificationGetList {
  @Expose()
  id: number;
  @Expose()
  notification_context: string;
  @Expose()
  notification_creat_at: Date;
  @Expose()
  notification_apartmentId: number;
  @Expose()
  notification_userCreateId: number;
  @Expose()
  user_create_avatar_url: string;
  @Expose()
  userCreate_name: string;
  @Expose()
  userCreate_avatar: string;
  @Expose()
  isSeen: boolean;
}
export class NotificationSeenDto {
  userId: number;
}
