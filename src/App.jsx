import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register"
import { Toaster } from "sonner";

const App = () => {
  return(
    <BrowserRouter future={{v7_startTransition: true, v7_relativeSplatPath: true}}>
    <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          
        </Route>
        <Route>{/**Admin Layout */}</Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;