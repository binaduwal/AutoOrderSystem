// import React,{ useState } from 'react'
// import './App.css'
// import SignUp from './Pages/SignUp'
// import SignIn from './Pages/Signin'

// function App() {

//   return(
//     <>
//    <SignUp/>
//    {/* <SignIn/> */}
//     </>
//   )
// }

// export default App

import React from 'react';
import './App.css';
import SignUp from './Pages/SignUp';
import SignIn from './Pages/Signin';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
