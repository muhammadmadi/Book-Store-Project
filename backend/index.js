import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookmodel.js";

const app = express();
//Middlewere for parsing request body
app.use(express.json());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("velcome to bookstore tutorials");
});


//create a new book
app.post("/books", async (request, response) => {
    try {
      if (
        !request?.body?.title ||
        !request?.body?.auther ||
        !request?.body?.publishYear
      ) {
        return response.status(400).send({
          message: "send all required field : title , auther , publishyear",
        });
      }
      const newbook = {
        title: request.body.title,
        auther: request.body.auther,
        publishYear: request.body.publishYear,
      };
      const book = await Book.create(newbook);
      return response.status(201).send(book +'\n' +` new book has been created with the ID : 
      ${book.id}`);
    } catch (error) {
      console.log(error);
    }
  });
  
  // route for get all books from database
  
  app.get("/books", async (request, response) => {
    try {
      const books = await Book.find({});
      return response.status(200).json({
        count: books.length,
        data: books,
      });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
  // route for get a book from database by id
  
  app.get("/books/:id", async (request, response) => {
    try {
      const { id } = request.params;
      const book = await Book.findById(id);
      return response.status(200).json(book);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
  //Route for update a book
  app.put("/books/:id", async (request, response) => {
    try {
      if (
        !request?.body?.title ||
        !request?.body?.auther ||
        !request?.body?.publishYear
      ) {
        return response.status(400).send({
          message: " send all required field : title , auther , publishyear",
        });
      }
      const {id} = request.params;
      const result = await Book.findByIdAndUpdate(id,request.body);
      
      if (!result) {
          return response.status(404).send({message:' Book not found'});
      }
      return response.status(200).send(result+'\n book has been updated ');
  
    } catch (error) {
      console.log(error.message);
      response.status(500).send({message :error.message});
    }
  });
  
  //Route for deleting a Book
  app.delete('/books/:id',async(request,response)=>{
      try {
          const { id } = request.params;
          const result = await Book.findByIdAndDelete(id);
          if (!result) {
              return response.status(404).send({message:' Book not found'});
          }
          return response.status(200).send( result+'\n Book has been Deleted ');
      } catch (error) {
          console.log(error.message);
          response.status(500).send({ message: error.message });
      }
  });

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
