import React, { ReactElement, useContext, useState } from 'react';
import { Form } from 'react-bootstrap';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Actions, Context } from './reducer';
import { Button, TextField, Grid, Container } from '@mui/material';
import { User } from '@/lib/user';



const UserDetails = (): ReactElement => {
 

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { state, dispatch } = useContext(Context);
  const { showMenuPage, activePage, villas } = state;
  const { showUserDetailsPage } = state;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
   
    event.preventDefault();
    const user = new User();
    await user.updateUser(formData).then((response) => {
      dispatch({
        type: Actions.SET_USER_DETAILS,
        data: false,
        villa: {},
        villas:villas
      });
    }
    ).catch((err) => {
      console.log(err);
    });
  };

  return (
    <Modal
      open={showUserDetailsPage}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit" style={{ background: '#8C684D' }}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>

  );
};

export default UserDetails;