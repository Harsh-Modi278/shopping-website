import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main.js";
import { SECTIONS, TITLE } from "./constants/headerConstants.js";

function App() {
  return (
    <div>
      <Header title={TITLE} sections={SECTIONS} />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
