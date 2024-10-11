import React, { useState } from 'react';
import EditBook from './EditBook';

import { Card, CardContent, Typography, Divider, CardHeader, IconButton, Popover, Button } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const BookDetails = ({book, allBooks, onUpdate, onDelete}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClosePopover = () => {
      setAnchorEl(null);
    };
  
    const handleCloseModal = () => {
        setOpenModal(false);
        setIsEditing(false);
    }

    const handleOpenModal = () => {
      setIsEditing(true);
        setOpenModal(true);
        handleClosePopover();
    }

    const handleDelete = () => {
        onDelete(book.id);
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    
    return (
        <React.Fragment>
            <Card  className='book-card' style={{ height: '100%', backgroundColor: '#fff2d1' }}>
            <CardHeader
                action={<IconButton aria-label="more" onClick={handleClick}>
                            <MoreVertIcon />
                        </IconButton>
                }
                title={book.title}
                subheader={book.author}
            />
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClosePopover}
                anchorOrigin={{vertical: 'bottom',horizontal: 'left',}}
            >
                <Typography sx={{ p: 2 }}>
                    <Button onClick={handleOpenModal}>Edit</Button>
                </Typography>
                <Typography sx={{ p: 2 }}> 
                    <Button onClick={handleDelete}>Delete</Button>
                </Typography>
            </Popover>
                <CardContent>
                    <Typography sx={{ color: 'text.secondary', fontSize: 14, paddingBottom: '5px' }}>{book.genre}</Typography>
                    <Divider />
                    <Typography sx={{ color: 'text.secondary', mb: 1.4, fontSize: 13, paddingTop: '15px' }}>{book.description}</Typography>
                </CardContent>
            </Card>
            {isEditing && <EditBook 
                            handleOpenModal={handleOpenModal}
                            handleCloseModal={handleCloseModal}
                            closePopover={handleClosePopover} 
                            isEditing={isEditing}
                            setIsEditing={setIsEditing}
                            book={book}
                            onUpdate={(updatedBook) => { onUpdate(updatedBook); 
                                                         setIsEditing(false);
                            }}
                        />}
        </React.Fragment>
    )
}

export default BookDetails;