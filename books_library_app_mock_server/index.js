const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// This will store our books in memory,
// "id" is the unique identifier,
// other fields are up to you
let books = [
  { id: 1, 
    title: 'Art of Botanical Drawing', 
    author: 'Agathe Ravet-Haevermans', 
    genre: 'Art & Arhitecture',
    description: 'This charmingly illustrated book is an ideal guide to the art of botanical drawing and painting. Agathe Ravet-Haevermans instructs the reader on how to recognise and draw a wide variety of flowers and leaves and covers the textures and structural elements of a range of different plants including succulents, vegetables, trees and grasses.' 
  },
  { 
    id: 2, 
    title: 'Making Hats', 
    author: 'Alison Hart',
    genre: 'Art & Arhitecture', 
    description: 'Hats finish an outfit - they make a statement, provide panache and lift your spirits. This book explains how to make your own hats, using traditional construction methods with both specialist millinery foundation materials and a range of fabrics and trimmings.' 
  },
  {
    id: 3,
    title: 'How To Draw',
    author: 'Jake Spicer',
    genre: 'Art & Arhitecture',
    description: 'This is his complete course in drawing, suitable for complete beginners as well as experienced artists, and designed to help you fit drawing into your lifestyle.'
  },
  {
    id: 4,
    title: 'The Official Stardew Valley Cookbook',
    author: 'Concernedape',
    genre: 'Cooking',
    description: 'An immersive cookbook based on the farming, foraging, and community role-playing video game, The Official Stardew Valley Cookbook celebrates seasonal ingredients through unique recipes inspired by the game. Cook your way through the seasons!'
  },
  {
    id: 5,
    title: 'Blue Zones Kitchen',
    author:' Dan Buettner',
    genre: 'Cooking',
    description: 'Building on decades of research, longevity expert Dan Buettner has gathered 100 recipes inspired by the Blue Zones, home to the healthiest and happiest communities in the world.'
  },
  {
    id: 6,
    title: 'The Oxford Book of American Short Stories',
    author: 'Joyce Carol Oates',
    genre: 'Literary Collections',
    description: 'In The Oxford Book of American Short Stories, Joyce Carol Oates offers a sweeping survey of American short fiction, in a collection of nearly sixty tales that combines classic works with many "different, unexpected" gems, and that invites readers to explore a wealth of important pieces by women and minority writers.'
  },
  {
    id: 7,
    title: 'The Devil and Sherlock Holmes: Tales of Murder, Madness, and Obsession',
    author: 'David Grann',
    genre: 'Literary Collections',
    description: 'From the bestselling author of Killers of the Flower Moon comes this "gripping" (The Miami Herald) and "hilarious" (EW) collection of true crime mysteries about people whose obsessions propel them into unfathomable and often deadly circumstances.'
  },
  {
    id: 8,
    title: 'Michelangelo and the Viewer in His Time',
    author: 'Bernadine Barnes',
    genre: 'Art & Arhitecture',
    description: 'Today Michelangelos painting and sculpture is seen most often in museums, while his archi-tectural designs have been left incomplete or modified by others so that some are barely recognizable. But his art was made to be viewed in churches, homes and political settings, by people who brought their own needs and expectations to his work.'
  }
];

// Get all books
app.get("/books", (req, res) => {
  res.json(books);
});

// Add a new book
app.post("/books", (req, res) => {
  const book = { id: Date.now(), ...req.body };
  books.push(book);
  res.status(201).json(book);
});

// Update a book
app.put("/books/:id", (req, res) => {
  const index = books.findIndex((book) => book.id === parseInt(req.params.id));
  if (index >= 0) {
    books[index] = { ...books[index], ...req.body };
    res.json(books[index]);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// Delete a book
app.delete("/books/:id", (req, res) => {
  books = books.filter((book) => book.id !== parseInt(req.params.id));
  res.status(204).send();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
