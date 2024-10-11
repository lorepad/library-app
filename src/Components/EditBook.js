import { Modal, Button, TextField, Box } from '@mui/material';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';

import './style.css';


const EditBook = ({handleOpenModal, handleCloseModal, closePopover, isEditing, setIsEditing, book, onUpdate }) => {
    
    const formik = useFormik({
      initialValues: {
        id: book.id,
        title: book.title || '',
        author: book.author || '',
        genre: book.genre || '',
        description: book.description || '',
      },
      validationSchema: Yup.object({
        title: Yup.string().required('Title is required'),
        author: Yup.string().required('Author is required'),
        genre: Yup.string().required('Genre is required'),
        description: Yup.string().required('Description is required'),
      }),
      onSubmit: async (values, {resetForm}) => {
        try {
          const response = await axios.put(`http://localhost:3001/books/${book.id}`, {
            id: values.id, 
            title: values.title,
            author: values.author,
            genre: values.genre,
            description: values.description,
          });
          onUpdate(response.data); 
          resetForm();

        } catch (error) {
          console.error('Failed to update book:', error);
        }
      },
      validateOnChange: false,
    });

    return (
        <Modal
          open={handleOpenModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
        <div className='modal-style'>
          <form  sx={{ marginTop: 0 }} onSubmit={formik.handleSubmit}>
              <TextField
                name="title"
                label="Title"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                />
              <TextField
                name="author"
                label="Author"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formik.values.author}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.author && Boolean(formik.errors.author)}
                helperText={formik.touched.author && formik.errors.author}
                />
              <TextField
                name="genre"
                label="Genre"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formik.values.genre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.genre && Boolean(formik.errors.genre)}
                helperText={formik.touched.genre && formik.errors.genre}
                />
              <TextField
                name="description"
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                margin="normal"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />
              <Box display="flex" justifyContent="space-between" mt={2}>
                <Button type="submit" variant="contained" color="primary">
                  Update Book
                </Button>
                <Button onClick={handleCloseModal} variant="contained" color="primary">
                  Cancel
                </Button>
              </Box >
          </form>
        </div>
      </Modal>
    )
}

export default EditBook;