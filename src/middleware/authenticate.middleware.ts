import * as jwt from "jsonwebtoken";
import { HandelStatus } from "../config/HandelStatus";
import { RoleDto, RoleDtoDetails } from "../dto/User/role.dto";
import { TokenService } from "../models/author/token.model";
export const CheckToken = async (req, res, next) => {
  let token = req.headers.token;
  if (!token) return HandelStatus(401, "Bạn chưa đăng nhập");
  var payload = await jwt.verify(
    token,
    process.env.TOKEN_SECRET_TV,
    async (err, verifiedJwt) => {
      if (err) {
        res.send(HandelStatus(401, err.message));
        return;
      } else {
        let token = await TokenService.getById(verifiedJwt.id);
        if  (!token) return res.send(HandelStatus(401));;
        req.body.userId = token.user.id || null;
        // req.body.user = token.user || null;
        req.body.role = token.role || null;
        next();
      }
    }
  );
};
const roleApproveApartment = async (req, res, next) => {
  let roleReq = req.body.role;
  if (!roleReq) return res.send(HandelStatus(400));
  let role = roleReq as RoleDtoDetails;
  if (role.isApproveApartment) next();
  else {
    return res.send(HandelStatus(403));
  }
};
const roleApproveComment = async (req, res, next) => {
  let roleReq = req.body.role;
  if (!roleReq) return res.send(HandelStatus(400));
  let role = roleReq as RoleDtoDetails;
  if (role.isApproveComment) next();
  else {
    return res.send(HandelStatus(403));
  }
};
const roleApproveUser = async (req, res, next) => {
  let roleReq = req.body.role;
  if (!roleReq) return res.send(HandelStatus(400));
  let role = roleReq as RoleDtoDetails;
  if (role.isApproveUser) next();
  else {
    return res.send(HandelStatus(403));
  }
};
const roleManager = async (req, res, next) => {
  let roleReq = req.body.role;
  if (!roleReq) return res.send(HandelStatus(400));
  let role = roleReq as RoleDtoDetails;
  if (role.isManager) next();
  else {
    return res.send(HandelStatus(403));
  }
};
const RoleIsCreateApartment = (req, res, next) => {
  let roleReq = req.body.role;
  if (!roleReq) return res.send(HandelStatus(400));
  let role = roleReq as RoleDtoDetails;
  if (role.isCreateApartment) next();
  else {
    return res.send(HandelStatus(403));
  }
};
const RoleIsEditApartment = (req, res, next) => {
  let roleReq = req.body.role;
  if (!roleReq) return res.send(HandelStatus(400));
  let role = roleReq as RoleDtoDetails;
  if (role.isEditApartment) next();
  else {
    return res.send(HandelStatus(403));
  }
};
const RoleIsComment = (req, res, next) => {
  let roleReq = req.body.role;
  if (!roleReq) return res.send(HandelStatus(400));
  let role = roleReq as RoleDtoDetails;
  if (role.isCreateOrEditComment) next();
  else {
    return res.send(HandelStatus(403));
  }
};
export const CheckRole = {
  roleApproveApartment,
  roleApproveComment,
  roleApproveUser,
  roleManager,
  RoleIsCreateApartment,
  RoleIsEditApartment,
  RoleIsComment,
};
