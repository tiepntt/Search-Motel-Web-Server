import { plainToClass } from "class-transformer";
import * as jwt from "jsonwebtoken";
import { HandelStatus } from "../../config/HandelStatus";
import { AccountDto, UserGetDto, UserInputDto } from "../../dto/User/user.dto";
import { UserService } from "../../models/User/user.model";
import roleRouter from "../../routers/User/role.router";
const login = async (req, res) => {
  var account = req.body.account;
  var accountGet = await UserService.getByAccount(account);
  if (accountGet.status != 200) return res.send(accountGet);
  let user = accountGet.result as AccountDto;
  const payload = {
    userId: user.id,
    role: user.role,
    isApprove: user.isApprove,
  };
  var token = jwt.sign(payload, process.env.TOKEN_SECRET_TV, {
    expiresIn: 1400, // expires in 24 hours
  });
  return res.json({
    status: 200,
    message: "authentication done ",
    token: token,
    account: user,
  });
};
const register = async (req, res) => {
  let account = req.body.account;
  if (!account) return HandelStatus(400);
  account = plainToClass(UserInputDto, account);
  let result = await UserService.create(account);
  return res.send(result);
};
const loginByEmail = async (req, res) => {};
const logOut = async (req, res) => {
  // var token = req.headers.token;
  // if (!token) return res.send(HandelStatus(401, "Bạn chưa đăng nhập"));
  // var payload = await jwt.verify(
  //   token,
  //   process.env.TOKEN_SECRET_TV,
  //   (err, verifiedJwt) => {
  //     if (err) {
  //       res.send(HandelStatus(401, err.message));
  //       return;
  //     } else {
  //       try {
  //         console.log(verifiedJwt);
  //         jwt.destroy(verifiedJwt);
  //         res.send(HandelStatus(200));
  //       } catch (e) {
  //         res.send(HandelStatus(500, e));
  //       }
  //     }
  //   }
  // );
  res.send(HandelStatus(200));
};
export const AuthenticateController = {
  login,
  logOut,
  register,
};
