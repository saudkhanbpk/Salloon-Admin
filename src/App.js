import React from "react";

import {
  Switch,
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./index.css";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Login from "./pages/Login";
import ManageStaff from "./pages/ManageStaff";
import NewRequests from "./pages/NewRequests";
import Orders from "./pages/Orders";
import ProductDetails from "./pages/ProductDetail";
import Settings from "./pages/Settings";
import DealsOffers from "./pages/DealsOffers";
import Calendar from "./pages/Calendar";
import AddEmployee from "./pages/AddEmployee";
import AddDeals from "./pages/AddDeals";
import StaffLogin from "./pages/StaffLogin";
import ProductAdd from "./pages/ProductAdd";
import HelpSupport from "./pages/HelpSupport"
import EditProfile from "./pages/EditProfile"
import StaffDetail from "./pages/StaffDetail";

import AddStaff from "./pages/AddStaff";
import AppointmentDetail from "./pages/AppointmentDetail";
import Services from "./pages/Services";
import AddServices from "./pages/AddService";
import Analytics from "./pages/Analytics";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditDeals from "./pages/EditDeals";
import SuperAdmin from "./pages/superAdmin/SuperAdmin";
import { MyCalendar } from "./pages/Calendar/Years";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* <Router>  */}

      <Switch>

        <Route exact path="/dashboard" component={Home} />
        {/* <Route exact path="/help" component={Home} /> */}
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/deals-offers" component={DealsOffers} />
        <Route exact path="/manage-staff" component={ManageStaff} />
        <Route exact path="/new-requests" component={NewRequests} />
        <Route exact path="/orders" component={Orders} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/staff-login" component={StaffLogin} />
        <Route exact path="/add-on" component={Products} />
        <Route exact path="/product-detail/:id" component={ProductDetails} />
        <Route exact path="/calendar" component={Calendar} />
        <Route exact path="/HelpSupport" component={HelpSupport} />
        <Route exact path="/EditProfile" component={EditProfile} />
        <Route exact path="/add-employee" component={AddEmployee} />
        <Route exact path="/add-deals" component={AddDeals} />
        <Route exact path="/edit-deals/:id" component={EditDeals} />
        <Route exact path="/create-add-on" component={ProductAdd}></Route>
        <Route exact path="/staff-detail/:id" component={StaffDetail}></Route>

        <Route exact path="/add-staff" component={AddStaff}></Route>
        <Route
          exact
          path="/appointment-detail/:id"
          component={AppointmentDetail}
        ></Route>

        <Route exact path="/analytics" component={Analytics}  ></Route>
        <Route exact path="/services" component={Services}></Route>
        <Route exact path="/add-service" component={AddServices}></Route>
        <Route exact path="/superAdmin" component={SuperAdmin}></Route>
        <Route exact path="/years" component={MyCalendar}></Route>


        <Redirect from="/" to="/login" />
      </Switch>
      {/* </Router> */}
    </>
  );
}

export default App;
