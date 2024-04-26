import { Link, Outlet } from "react-router-dom";
import Navbar from "../components/header/Navbar";

function RootLayout() {
  return (
    <>
      <Navbar />
      <Link to="/">Home</Link>
      <Link to={"/about"}>About</Link>
      <Outlet />
    </>
  );
}

export default RootLayout;