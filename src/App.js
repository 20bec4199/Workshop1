import logo from './logo.svg';
import './App.css';
import { Login } from './Authentication/Login';
import Register from './Authentication/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import { useState } from 'react';
import { Dashboard } from './admin/Dashboard';
import { Profile } from './admin/Profile';
import { Workshop } from './admin/workshop/workshop';
import PrivateRoute from './Authentication/PrivateRoute';
import { PageNotFound } from './components/PageNotFound';
import WorkshopDetails from './admin/workshop/WorkshopDetails';
import { Echart } from './admin/workshop/Echart';
import { Profile1 } from './staff/Profile';
import { RegisterWorkshop } from './staff/workshop/Register';
import { StaffDashboard } from './staff/Dashboard';
import { UserWorkshops } from './staff/workshop/Workshops';
import { CompletedWorkshops } from './staff/workshop/CompletedWorkshops';
import { MyEvents } from './admin/workshop/MyEvents';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [userData, setUserData] = useState(null);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} setUserData={setUserData} userData={userData} />} />

          <Route path='dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path='/create/workshop' element={<PrivateRoute><Workshop /></PrivateRoute>} />
          <Route path='/workshops' element={<PrivateRoute><Echart /></PrivateRoute>} />
          <Route path='created/workshop/my' element={<PrivateRoute><MyEvents /></PrivateRoute>} />

          {/* Staff routes */}
          <Route path='/staff/dashboard' element={<PrivateRoute><StaffDashboard /></PrivateRoute>} />
          <Route path='/staff/profile' element={<PrivateRoute><Profile1 /></PrivateRoute>} />
          <Route path='/workshop/register' element={<PrivateRoute><RegisterWorkshop /></PrivateRoute>} />
          <Route path='/staff/workshops' element={<PrivateRoute><UserWorkshops /></PrivateRoute>} />
          <Route path='/staff/completed/workshops' element={<PrivateRoute><CompletedWorkshops /></PrivateRoute>} />
          <Route path='*' element={<PageNotFound />} />


        </Routes>


      </BrowserRouter>
    </div>
  );
}

export default App;
