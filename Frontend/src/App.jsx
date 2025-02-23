 import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
 import EditPermission from './permissions/EditPermission';
 import PermissionList from './permissions/PermissionList';
import SignUp from './Pages/SignUp';
import CreatePermission from './permissions/CreatePermission';
import CreateUser from './users/CreateUser';
import SignIn from './Pages/SignIn'
import UserDashboard from './Pages/UserDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<SignIn/>} />
        <Route path="/" element={<Layout />}>
         <Route path="/signup" element={<SignUp />} />
         <Route path='/dashboard' element={<Dashboard/>}/>
         <Route path='/permission/edit' element={<EditPermission/>}/>
         <Route path='/permission' element={<PermissionList/>}/>
         <Route path="permission/create" element={<CreatePermission />} />
         <Route path="/user" element={<CreateUser/>} />
        </Route>
        <Route index path='/userdashboard' element={<UserDashboard/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;

