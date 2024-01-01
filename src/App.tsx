import { BrowserRouter } from "react-router-dom";

import Pages from "./pages/Pages";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-white w-full h-full">
        <Navbar />
        <Hero />
        <Pages />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
