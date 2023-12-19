import Home from "./Pages/Home/Index";

import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { SocketProvider } from "./Pages/Context/socketContext";
import { Sigin } from "./Pages/Signin/Signin";
import { Sigup } from "./Pages/Signup/Signup";
import NewGame from "./Pages/Admin/NewGame";
import Reports from "./Pages/Admin/Reports";
import { ProtectedRoute } from "./Pages/components/protectedroutes";
import Transactions from "./Pages/Transactions";
import Requests from "./Pages/Admin/Requests";

function App() {
  //lobbby you joined left
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route path="/" element={<ProtectedRoute />}>
          <Route index element={<Home />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="admin/new" element={<NewGame />} />
          <Route path="admin/reports" element={<Reports />} />
          <Route path="admin/requests" element={<Requests />} />
        </Route>

        <Route path="signin" element={<Sigin />} />
        <Route path="signup" element={<Sigup />} />
        <Route path="*" element={<Home />} />
      </Route>
    )
  );
  return (
    <>
      <SocketProvider>
        <RouterProvider router={router} />
      </SocketProvider>
    </>
  );
}
const Root = () => {
  return (
    <>
      <Outlet />
    </>
  );
};
export default App;
