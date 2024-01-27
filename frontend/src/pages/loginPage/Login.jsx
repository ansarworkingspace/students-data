import React,{ useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAdminLoginMutation } from '../../slice/Admin/AdminApiSlice';
import { setAdminCredentials } from '../../slice/Admin/AuthSlice';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import './Login.css'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [adminLogin] = useAdminLoginMutation();

  const { adminInfo } = useSelector((state) => state.auth);


  useEffect(() => {
    if (adminInfo) {
      navigate('/');
      
    }
  }, [navigate, adminInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await adminLogin({ email, password }).unwrap();
      dispatch(setAdminCredentials({ ...res }));
      
      navigate('/');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className='loginMainDiv'>
      <h3>Admin Login</h3>
      <div className='loginBox'>
        <div className='inputGroup'>
         
          <input
            type='email'
            id='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email'
          />
        </div>
        <div className='inputGroup'>
       
          <input
            type='password'
            id='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter your password'
          />
        </div>
        <button onClick={submitHandler}>Login</button>
      </div>
    </div>
  );
};

export default Login;
