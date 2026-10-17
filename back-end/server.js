import authRouter from "./src/routes/authRoutes.js";
import userRouter from "./src/routes/userRoutes.js";
import express from "express";
import dotenv from "dotenv";



console.log(
  "Database password loaded:",
  typeof process.env.DB_PASSWORD === "string"
);


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