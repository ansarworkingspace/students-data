
import Header from '../src/components/header/Header';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'

const App = () => {
  return (

      <div className='appCss'>
        <Header />
        <ToastContainer />
        <Outlet />
      </div>

  );
};

export default App;