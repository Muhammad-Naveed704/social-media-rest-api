
import  express  from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";
import authRoutes from './routes/authRoutes.js'
import profileRoutes from './routes/profileRoutes.js'
// import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';



const app = express();
dotenv.config();
const port = 8000;

const connect = async () => {
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("mongo db conected");
    }).catch((err)=>{
        console.log("error");
        throw err;
    })
}

// middelware\//////////////\\\\\\\\\\\\\\
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use((req, res, next) => {
    req.body.date = new Date()
    console.log(req.body)
    next()
})
// routes
app.use("/auth", authRoutes)
app.use("/profile", profileRoutes)
// app.use("api/users", userRoutes)
app.use("/post", postRoutes);

app.listen(port,() => {
    console.log(`server is running port no ${port}`);
    connect()
});

