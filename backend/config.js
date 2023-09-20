import dotenv from 'dotenv'; 
dotenv.config();


export const PORT = process.env.PORT ||5555 ;

//export const mongoDBURL = 'mongodb+srv://Admin:Admin@book-store-mern.sojedtm.mongodb.net/books-collection?retryWrites=true&w=majority&appName=AtlasApp' ;
export const mongoDBURL =   'mongodb+srv://Admin:Admin@book-store-mern.sojedtm.mongodb.net/books-collection?retryWrites=true&w=majority&appName=AtlasApp' ;
