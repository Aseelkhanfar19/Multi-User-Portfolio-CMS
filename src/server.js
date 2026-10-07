import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import express from "express";



const app = express();
app.use(express.json());
const PORT = 5000;



app.use("/api/auth",authRouter);
app.use("/api/user",userRouter);

app.get("/", (req, res) => {
    res.send("Server is working");
});

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});