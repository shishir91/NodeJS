import express from "express";
import userRoute from "./routes/userRoute.js";

const app = express();
app.use(express.json());


app.use("/user", userRoute)
app.listen(8800, async () => {
    console.log("Server has Started");
    
})