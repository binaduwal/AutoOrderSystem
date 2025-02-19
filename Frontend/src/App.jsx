import React from 'react';
import './App.css';
import SignUp from './Pages/SignUp';
import SignIn from './Pages/SignIn';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import CreatePermission from './permissions/CreatePermission';
import EditPermission from './permissions/EditPermission';
import PermissionList from './permissions/PermissionList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/permission/edit' element={<EditPermission/>}/>
        <Route path='/permissions' element={<PermissionList/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
