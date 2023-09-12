//imports
import bodyParser from "body-parser";
import cors from "cors"; 
import express from "express";
import fileUpload from "express-fileupload";
import config from "./Utils/Config";
import ErrorHandler from "./MiddleWare/route-not-found";
import { myBanner } from "./Utils/banner";
import router from "./Routes/MainRoutes";

// ==========================
// SERVER
// ==========================


const server = express();

// Middleware configurations
server.use(cors());
server.use(express.json());
server.use(express.static("user_videos"));
server.use(fileUpload({ createParentPath: true }));
server.use(bodyParser.json());

// Routes
server.use("/test", router);
server.use("/developers_groups/", router);

server.use("*", ErrorHandler);

console.log(myBanner);
server.listen(config.WebPort, () => {
    console.log(`listening on http://${config.mySQLhost}:${config.WebPort}`);
});

