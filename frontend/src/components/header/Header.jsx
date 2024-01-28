import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAdminLogoutMutation } from '../../slice/Admin/AdminApiSlice';
import { adminLogout } from '../../slice/Admin/AuthSlice';

import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';

import './Header.css'


const Header = () => {

  const { adminInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [logoutApi] = useAdminLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(adminLogout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };


  const handleAddClick = () => {
    // Handle the click event and navigate to "/create"
    navigate('/create');
  };


  return (
    <div className='HeadermainDiv'>
      <div className='logo'>
      <img src="WAKEUP_LOGO-removebg-preview.png" alt="" />
      </div>
      <div className='LinkInHeader'>
      {adminInfo ? (
        <div className="linkOfHeader">
       <IconButton  onClick={handleAddClick}>
        <AddIcon />
         </IconButton>
         <IconButton  onClick={() => console.log('hai')}>
         <PersonIcon />
         </IconButton>
        <IconButton  onClick={logoutHandler}>
        <LogoutIcon />
       </IconButton>
       <IconButton   onClick={() => console.log('hai')}>
       <Avatar sx={{ 
                backgroundColor: 'cadetblue', 
                width: { xs: '1.5rem', sm: '2rem', md: '2rem' },
                height: { xs: '1.5rem', sm: '2rem', md: '2rem' },
                fontSize: { xs: '10px', sm: '12px', md: '14px' },
              }}>
                {adminInfo.email ? adminInfo.email[0].toUpperCase() : ''}
       </Avatar>
       </IconButton>

      </div>
       
       
      ) : (
        <h3>About</h3>
      )}
      </div>
    </div>
  )
}

export default Header
