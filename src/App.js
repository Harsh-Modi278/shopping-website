import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main.js";
import { SECTIONS, TITLE } from "./constants/headerConstants.js";
import { useState } from "react";
import { CartContext } from "./CartContext";
import { BrowserRouter as Router } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
}));

const App = () => {
  const [cart, setCart] = useState([]);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Router>
        <CartContext.Provider value={{ cart, setCart }}>
          <Header title={TITLE} sections={SECTIONS} cartItems={cart.length} />
          <Main />
          <Footer />
        </CartContext.Provider>
      </Router>
    </div>
  );
};

export default App;
