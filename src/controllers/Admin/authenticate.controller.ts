import { plainToClass } from "class-transformer";
import * as jwt from "jsonwebtoken";
import { HandelStatus } from "../../config/HandelStatus";
import { AccountDto, UserInputDto } from "../../dto/User/user.dto";
import { TokenService } from "../../models/author/token.model";
import { UserService } from "../../models/User/user.model";
const login = async (req, res) => {
  var account = req.body.account;
  var accountGet = await UserService.getByAccount(account);
  if (accountGet.status != 200) return res.send(accountGet);
  let user = accountGet.result as AccountDto;
  const payload = {
    userId: user.id,
    roleId: user.role.id,
  };
  let tokenCode = await TokenService.create(payload);
  let payload2 = {
    user: tokenCode.user,
    role: tokenCode.role,
    id: tokenCode.id,
  };
  var token = jwt.sign(payload2, process.env.TOKEN_SECRET_TV, {
    expiresIn: 1400 * 24, // expires in 24 hours
  });
  return res.json({
    status: 200,
    message: "authentication done ",
    token: token,
    account: user,
  });
};
const register = async (req, res) => {
  let accountInput = req.body.account;
  if (!accountInput) return res.send(HandelStatus(400));
  let account = plainToClass(UserInputDto, accountInput);
  if (
    account.roleCode === "MNG" ||
    account.roleCode === "A" ||
    !account.roleCode
  ) {
    account.roleCode = "R";
  }
  let result = await UserService.create(account);
  return res.send(result);
};
const loginByEmail = async (req, res) => {};
const logOut = async (req, res) => {
  var token = req.headers.token;
  if (!token) return res.send(HandelStatus(401, "Bạn chưa đăng nhập"));
  var payload = await jwt.verify(
    token,
    process.env.TOKEN_SECRET_TV,
    async (err, verifiedJwt) => {
      if (err) {
        res.send(HandelStatus(401, err.message));
        return;
      } else {
        let result = await TokenService.remove(verifiedJwt.id);
        res.send(result);
      }
    }
  );
};
const ResetPassword = async (req, res) => {
  let email = req.body.email;

  let result = await UserService.resetPassword(email);
  return res.send(result);
};
export const AuthenticateController = {
  login,
  logOut,
  register,
  ResetPassword,
};
