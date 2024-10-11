import React from 'react';
import axios from 'axios';
import { Button, TextField, Box } from '@mui/material';

import { useFormik } from 'formik';
import * as Yup from 'yup';

const NewBook = ({ mutate }) => {
    const formik = useFormik({
        initialValues: {
          title: '',
          author: '',
          genre: '',
          description: '',
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required'),
            author: Yup.string().required('Author is required'),
            genre: Yup.string().required('Genre is required'),
            description: Yup.string().required('Description is required'),
        }),
        onSubmit: async (values, { setSubmitting, resetForm }) => {
          try {
            await axios.post('http://localhost:3001/books', values);
    
            mutate();
            resetForm();
          } catch (error) {
            console.error('Error adding the book:', error);
          } finally {
            setSubmitting(false);
          }
        },
        validateOnChange: false,
      });

    return  (
        
        <form onSubmit={formik.handleSubmit}>
            <Box sx={{  display: 'flex', flexDirection: 'column', gap: 2, padding: 2,}}>
                <TextField
                label="Title"
                name="title"
                variant="outlined"
                fullWidth
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                />
                <TextField
                label="Author"
                name="author"
                variant="outlined"
                fullWidth
                value={formik.values.author}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.author && Boolean(formik.errors.author)}
                helperText={formik.touched.author && formik.errors.author}
                />
                <TextField
                label="Genre"
                name="genre"
                variant="outlined"
                fullWidth
                value={formik.values.genre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.genre && Boolean(formik.errors.genre)}
                helperText={formik.touched.genre && formik.errors.genre}
                />
                <TextField
                    label="Description"
                    name="description"
                    variant="outlined"
                    fullWidth
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                />
                <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={formik.isSubmitting}
                >
                    {formik.isSubmitting ? 'Submitting...' : 'Add Book'}
                </Button>
            </Box>
        </form>
    )
}

export default NewBook;