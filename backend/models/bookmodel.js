import mongoose from "mongoose";

const bookScheme = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    auther: {
      type: String,
      required: true,
    },
    publishYear: {
      type: Number,
      required: true,
    },
  },
  { timesamps: true 
  }
);

export const Book = mongoose.model("book",bookScheme);
