import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookmodel.js";
import booksRoute from "./routes/booksRoute.js";
import router from "./routes/booksRoute.js";
import cors from "cors";

const app = express();
//Middlewere for parsing request body
app.use(express.json());

//Middlewere for use CORS  policcy
//option 1 : allow all origins with default or cors(*)
app.use(cors);

//option 2 : allow custom origins
app.use(
  cors({
    origin: "http://localhost:5555",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-tupe"],
  })
);

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("velcome to bookstore tutorials");
});

app.use("/books", router);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to Database");
    app.listen(PORT, () => {
      console.log(`app is listening to port : ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`${error}\nError connecting to database`);
  });
