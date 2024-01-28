import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAdminLogoutMutation } from '../../slice/Admin/AdminApiSlice';
import { adminLogout } from '../../slice/Admin/AuthSlice';
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



  return (
    <div className='HeadermainDiv'>
      <div className='logo'>
      <img src="WAKEUP_LOGO-removebg-preview.png" alt="" />
      </div>
      <div className='LinkInHeader'>
      {adminInfo ? (
        <h3  onClick={logoutHandler}>Logout</h3>
      ) : (
        <h3>About</h3>
      )}
      </div>
    </div>
  )
}

export default Header
