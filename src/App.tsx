import { createBrowserRouter } from "react-router-dom"

import { Home } from "./pages/home" 
import { Login } from "./pages/login"
import { Admin } from "./pages/admin"
import { NetWorks } from "./pages/networks"
import NotFound from "./pages/notfound"
import { Private } from "./routes/private"

const router = createBrowserRouter([
  {
    path: '/',
    element:<Home/>
  }, 
  {
    path: '/login',
    element:<Login/>
  },
  {
    path:'/admin',
    element:<Private> <Admin/> </Private> 
  },
  {
    path:'/admin/social',
    element:<NetWorks/>
  },
  {
    path: "*",
    element: <NotFound />,
  },
])

export { router };
