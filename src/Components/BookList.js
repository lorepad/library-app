import React, { useState } from 'react';
import fetcher from '../fetcher';
import useSWR from 'swr';
import axios from 'axios';

import './../index.css';

import BookDetails from './BookDetails';
import NewBook from './NewBook';

import { Typography, Grid, IconButton, Box } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';

const BookList = () => {
    const { data, error, mutate  } = useSWR('http://localhost:3001/books', fetcher);
    
    const [isAdding, setIsAdding] = useState(false);

    if (error) return <Typography color="error">Failed to load books.</Typography>;
    if (!data) return <Typography>Loading...</Typography>;

    const handleUpdateBook = async(updatedBook) => {
          try {
            await axios.put(`http://localhost:3001/books/${updatedBook.id}`, updatedBook);
            mutate(
                data.map((book) =>
                  book.id === updatedBook.id ? updatedBook : book
                ),
                false
              );
          } catch (error) {
            console.error('Failed to update book:', error);
          }
        };
        
    const handleDeleteBook = async (bookId) => {
        const filteredBooks = data.filter(b => b.id !== bookId);
        
        try {
            await axios.delete(`http://localhost:3001/books/${bookId}`); 
      
            mutate(filteredBooks, false);
          } catch (error) {
            console.error('Error updating books:', error);
          } 
    }

    const toggleAddBook =() => {
        setIsAdding(!isAdding);
    }
    
    return(
        <div>
            <Box display="flex" alignItems="center"  className ='add-btn'>
                <div><Typography>Add New Book </Typography> </div>
                <IconButton aria-label="more" onClick={toggleAddBook} color='default' className='add-btn'>    
                    <AddBoxIcon />
                </IconButton>
            </Box>
            <div>{isAdding && <NewBook mutate={mutate}/>}</div>
            <Grid container spacing={3} justifyContent="center" alignItems="stretch">
                {data.map((book) => (
                    <Grid item xs={12} sm={6} md={4} key={book.id}>
                       <BookDetails 
                            key={book.id}
                            book={book}
                            allBooks={data}
                            onUpdate={handleUpdateBook}
                            onDelete={handleDeleteBook}
                        />
                    </Grid>
                ))}
            </Grid>
            
        </div>   
    )
}

export default BookList;