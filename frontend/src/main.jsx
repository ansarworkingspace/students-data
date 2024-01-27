

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import HomeScreen from './pages/homePage/HomePage.jsx';
import LoginScreen from './pages/loginPage/Login.jsx';
import store from './store.js';
import { Provider } from 'react-redux';
import PrivateRoute from './components/AdminPrivetRouter.jsx';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/login' element={<LoginScreen />} />

      <Route path='/' element={<PrivateRoute />}>
        <Route index={true} element={<HomeScreen />} />
       
      </Route>

    </Route>
  )
);


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
