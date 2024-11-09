import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import HeroSection from './component/herosection/HeroSection.jsx';
import Signup from './component/authentication/Signup.jsx';
import Login from './component/authentication/Login.jsx';
import FindRoute from './component/findroute/FindRoute.jsx';
import AboutUs from './component/about/about.jsx';
import Dashboard from './component/dashborad/Dashboard.jsx';
import { AuthProvider } from './context/AuthContext';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' element={<HeroSection />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/find-route' element={<FindRoute /> } />
      <Route path='/about' element={<AboutUs />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider> {/* Wrap the router with AuthProvider */}
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  </StrictMode>
);
