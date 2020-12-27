import * as express from "express";
import * as http from "http";
import * as morgan from "morgan";
require("dotenv").config();

import * as cors from "cors";
import * as bodyParser from "body-parser";
import { debug } from "console";
import { connection } from "./connection";
import { router } from "./routers";
import { loader } from "./loader";
import { ConnectSocket } from "./loader/soketio";

let app = express();
var server = http.createServer(app);
//connection

connection();

const options: cors.CorsOptions = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
    "token",
  ],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: "*",
  preflightContinue: false,
};
app.use(cors(options));
// upload
app.use(express.static("public"));
app.use(express.static("public/avatar"));
app.use(express.static("public/apartment"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

morgan.token("id", function getId(req) {
  return req.id;
});
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("<h1>Web Server Timtro.vn</h1>");
});

loader();
router(app);

export const io = ConnectSocket(server);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers");
});
server.listen(process.env.PORT || 3000);
server.on("listening", onListening);
function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}
