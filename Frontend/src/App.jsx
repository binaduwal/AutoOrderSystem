 import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
 import EditPermission from './permissions/EditPermission';
 import PermissionList from './permissions/PermissionList';
import SignUp from './Pages/SignUp';
import CreatePermission from './permissions/CreatePermission';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
         <Route path="/signup" element={<SignUp />} />
         <Route path='/dashboard' element={<Dashboard/>}/>
         <Route path='/permission/edit' element={<EditPermission/>}/>
         <Route path='/permission' element={<PermissionList/>}/>
         <Route path="permission/create" element={<CreatePermission />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

