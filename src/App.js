

import Error from "./pages/error/error";
import Home from "./pages/home/home";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Admin from "./pages/admin/Admin";
import ExecutePrompts from "./components/prompts/execute/ExecutePrompts";
import UpdatePrompts from "./components/prompts/update/UpdatePrompts";
import CreatePrompts from "./components/prompts/create/CreatePrompts";
import UserProfile from "./pages/user/UserProfile";
import VerifyUser from "./pages/verify/Verify";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    errorElement: <Error/>,
    children: [
      {
        path: "execute/:id",
        element: < ExecutePrompts/>,
      },
      {
        path: "/update/:id",
        element: <UpdatePrompts/>,
      },
      {
        path: "create",
        element: <CreatePrompts/>,
      },
    ]
  },
  {
    path: "/login",
    element: <Login></Login>,
    errorElement: <Error/>   
  },
  {
    path: "/register",
    element: <Register></Register>,
    errorElement: <Error/>   
  },
  {
    path: "/verify/:id",
    element: <VerifyUser/>,
    errorElement: <Error/>   
  },
  {
    path: "/users",
    element: <Admin></Admin>,
    errorElement: <Error/>   
  },
  {
    path: "/userprofile",
    element: <UserProfile/>,
    errorElement: <Error/>   
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;

