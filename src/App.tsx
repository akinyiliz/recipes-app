import { BrowserRouter } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Pages from "./pages/Pages";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-white w-full min-h-screen flex flex-col">
        <Navbar />
        <Hero />
        <Pages />
        <Footer />
      </div>

      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
