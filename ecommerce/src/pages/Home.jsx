// import Search from "../features/Search/Search";
import { Outlet } from "react-router-dom";
// import Products from "../features/product/Products";
// import Footer from "../ui/Footer/Foot";
import Header from "../ui/Header/Header";

function Home() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Home;
