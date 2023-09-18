import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookmodel.js";
import booksRoute from "./routes/booksRoute.js";
import router from "./routes/booksRoute.js";

const app = express();
//Middlewere for parsing request body
app.use(express.json());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("velcome to bookstore tutorials");
});

app.use('/books',router);


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
