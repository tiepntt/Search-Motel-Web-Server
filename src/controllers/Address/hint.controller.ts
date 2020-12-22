import { HintService } from "../../models/Address/hint.model";

const getByKey = async (req, res) => {
  let { key, take } = req.query;
  let result = await HintService.getByKey(key, take);
  return res.send(result);
};
export const HintController = {
  getByKey,
};
