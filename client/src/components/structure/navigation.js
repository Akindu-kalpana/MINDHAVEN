// import { About } from "../pages/About"
import { Account } from "../pages/Account"
import { Home } from "../pages/Home"
import { Login } from "../pages/Login"
import { Signup } from "../pages/Signup"
import { Locker } from "../pages/Locker"
import { Delivery } from "../pages/Delivery"
import Shipment from '../pages/Parcel';

export const nav = [
     { path:     "/",         name: "Home",        element: <Home />,       isMenu: true,     isPrivate: false},
     { path:     "/login",    name: "Login",       element: <Login />,      isMenu: false,    isPrivate: false  },
     { path:     "/signup",    name: "Sign Up",       element: <Signup />,      isMenu: true,    isPrivate: false,  isLogged:false},
     { path:     "/account",  name: "Dashboard",     element: <Account />,    isMenu: true,     isPrivate: true  },
     { path:     "/resource",  name: "Resource",     element: <Locker />,    isMenu: true,     isPrivate: true  },
     { path:     "/bot",  name: "AI bot",     element: <Shipment />,    isMenu: true,     isPrivate: true  },
     { path:     "/track",  name: "Track your progress",     element: <Delivery />,    isMenu: true,     isPrivate: true  },   
       
]