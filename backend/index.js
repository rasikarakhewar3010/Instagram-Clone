import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connetDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js"
import messageRoute from "./routes/message.route.js"

dotenv.config({});
const app = express();

const PORT = process.env.PORT|| 3000;

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({extended: true}));
const corsOption = {
    origin:"http://localhost:5173",
    credentials:true
}
app.use(cors(corsOption));


app.use("/api/v1/user",userRoute)
app.use("/api/v1/post",postRoute)
app.use("/api/v1/messhage",messageRoute)

app.listen(PORT, ()=>{
    connetDB();
    console.log(`Server listen on Port ${PORT}`)
});