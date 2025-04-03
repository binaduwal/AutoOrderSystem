 import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './Pages/Dashboard'
 import PermissionList from './permissions/PermissionList'
import SignUp from './Pages/SignUp'
import CreateUser from './users/CreateUser'
import SignIn from './Pages/SignIn'
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
import UnitList from './company/productUnit/UnitList'
import CreateUnit from './company/productUnit/CreateUnit'
import ProductTable from './company/product/ProductTable'
import CreateOrder from './company/order/CreateOrder'
import PaymentTable from './company/payment/paymentTable'
import RouteTable from './company/route/RouteTable'
import PartyGroup from './company/partyGroup/PartyGroupTable'
import Salesperson from './company/salesperson/SalespersonTable'
import Order from './company/order/OrderTable'
import Party from './company/party/PartyTable'
import EditOrder from './company/order/EditOrder'
import UserDashboard from './Pages/UserDashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn/>} />
         <Route path="/signup" element={<SignUp />} />
         <Route path="/company/login" element={<LoginForm />} />
         <Route path="/user" element={<UserDashboard />} />


      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Layout />}>
         <Route path='/admin/dashboard' element={<Dashboard/>}/>
         <Route path='/admin/permission' element={<PermissionList/>}/>
         <Route path='/admin/role' element={<RolesList/>}/>
         <Route path="/admin/user" element={<CreateUser/>} />
         <Route path="/admin/manage" element={<ManageUser/>} />
         <Route path="/admin/company" element={<CompanyList/>} />
         <Route path="/admin/create-company" element={<CreateCompany/>} />
         <Route path="/admin/settings" element={<SettingPage/>} />
         <Route path="/admin/location" element={<LocationTable/>} />
         <Route path="/admin/province" element={<ProvinceTable/>} />
         <Route path="/admin/city" element={<CityTable/>} />
        </Route>
        </Route> 

        <Route element={<PrivateRoute requiredRole="company"/>}>
          <Route path="/company" element={<CompanyLayout />}>
            <Route index element={<CompanyDashboard />} />
            <Route path="category" element={<CategoryTable />} />
            <Route path="category-create" element={<CategoryForm />} />
            <Route path="category-edit/:id" element={<EditCategory />} />
            <Route path="product" element={<ProductTable />} />
            <Route path="unit" element={<CreateUnit/>} />
            <Route path="unit-list" element={<UnitList/>} />
            <Route path="create-order" element={<CreateOrder/>} />
            <Route path="payment" element={<PaymentTable/>} />
            <Route path="route" element={<RouteTable/>} />
            <Route path="partygroup" element={<PartyGroup/>} />
            <Route path="salesperson" element={<Salesperson/>} />
            <Route path="order" element={<Order/>} />
            <Route path="party" element={<Party/>} />
            <Route path="edit-order/:orderId" element={<EditOrder />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

