import { useState } from "react";
import "./App.css";
import Footer from "./component/footer/Footer";
import Navbar from "./component/header/Navbar";
import { Outlet } from "react-router-dom";


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer/>
    </>
  );
}

export default App;
