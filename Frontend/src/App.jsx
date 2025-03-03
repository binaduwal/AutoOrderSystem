 import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './Pages/Dashboard'
 import EditPermission from './permissions/EditPermission'
 import PermissionList from './permissions/PermissionList'
import SignUp from './Pages/SignUp'
import CreatePermission from './permissions/CreatePermission'
import CreateUser from './users/CreateUser'
import SignIn from './Pages/SignIn'
import UserDashboard from './Pages/UserDashboard'
import RolesList from './roles/RolesList'
import ManageUser from './users/ManagerUser'
import EditUser from './users/EditUser'
import PasswordForm from './users/PasswordForm'
import CompanyList from './company/CompanyList'
import CreateCompany from './company/CreateCompany'

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
         <Route path='/role' element={<RolesList/>}/>
         <Route path="permission/create" element={<CreatePermission />} />
         <Route path="/user" element={<CreateUser/>} />
         <Route path="/manage" element={<ManageUser/>} />
         <Route path="/edit-user" element={<EditUser/>} />
         <Route path="/company" element={<CompanyList/>} />
         <Route path="/create-company" element={<CreateCompany/>} />


        </Route>
        <Route index path='/userdashboard' element={<UserDashboard/>}/>

      </Routes>
    </BrowserRouter>
  )
}

export default App

