import { NotificationApartmentService } from "../../models/Notification/notification.apartment.model";

export const NotificationApartmentController = {
  getAll: async (req, res) => {
    let { take, skip } = req.query;
    let userId = res.locals.userId;
    let result = await NotificationApartmentService.getAll(userId, take, skip);
    return res.send(result);
  },
  getNews: async (req, res) => {
    let userId = res.locals.userId;
    let result = await NotificationApartmentService.getNews(userId);
    return res.send(result);
  },
  seen: async (req, res) => {
    let id = req.body.notificationId;
    let userId = res.locals.userId;
    let result = await NotificationApartmentService.seen(userId, id);
    return res.send(result);
  },
};
