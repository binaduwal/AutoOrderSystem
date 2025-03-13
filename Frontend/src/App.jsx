 import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './Pages/Dashboard'
 import PermissionList from './permissions/PermissionList'
import SignUp from './Pages/SignUp'
import CreateUser from './users/CreateUser'
import SignIn from './Pages/SignIn'
// import UserDashboard from './Pages/UserDashboard'
import RolesList from './roles/RolesList'
import ManageUser from './users/ManagerUser'
import CompanyList from './company/CompanyList'
import CreateCompany from './company/CreateCompany'
import LocationTable from './settings/locationTable'
import SettingPage from './settings/SettingPage'
import ProvinceTable from './settings/province/ProvinceTable'
import CityTable from './settings/city/CityTable'
import LoginForm from './company/LoginForm'
import CompanyDashboard from './company/CompanyDashboard'
import CategoryForm from './category/CategoryForm'
import CategoryTable from './category/CategoryTable'
import EditCategory from './category/EditCategory'
import CompanyLayout from './company/companyLayout'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn/>} />
         <Route path="/signup" element={<SignUp />} />
         <Route path="/login" element={<LoginForm />} />


      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Layout />}>
         <Route path='/dashboard' element={<Dashboard/>}/>
         <Route path='/permission' element={<PermissionList/>}/>
         <Route path='/role' element={<RolesList/>}/>
         <Route path="/user" element={<CreateUser/>} />
         <Route path="/manage" element={<ManageUser/>} />
         <Route path="/company" element={<CompanyList/>} />
         <Route path="/create-company" element={<CreateCompany/>} />
         <Route path="/settings" element={<SettingPage/>} />
         <Route path="/location" element={<LocationTable/>} />
         <Route path="/province" element={<ProvinceTable/>} />
         <Route path="/city" element={<CityTable/>} />
        </Route>
        </Route> 

        <Route element={<PrivateRoute requiredRole="company"/>}>
          <Route path="/company" element={<CompanyLayout />}>
            <Route index element={<CompanyDashboard />} />
            <Route path="category" element={<CategoryTable />} />
            <Route path="category-create" element={<CategoryForm />} />
            <Route path="category-edit/:id" element={<EditCategory />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

