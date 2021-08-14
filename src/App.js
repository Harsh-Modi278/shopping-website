import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main.js";
import { SECTIONS, TITLE } from "./constants/headerConstants.js";
import { useState } from "react";
import { CartContext } from "./CartContext";

const App = () => {
  const [cart, setCart] = useState([]);

  return (
    <div>
      <CartContext.Provider value={{ cart, setCart }}>
        <Header title={TITLE} sections={SECTIONS} cartItems={cart.length} />
        <Main />
        <Footer />
      </CartContext.Provider>
    </div>
  );
};

export default App;
