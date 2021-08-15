import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "../pages/Home";
import Products from "../pages/Products";
import Contact from "../pages/Contact";
import routes from "../constants/routes.json";

const Main = (props) => {
  return (
    <Switch>
      <Route exact path={routes.HOME} component={Home} />
      <Route path={routes.PRODUCTS} component={Products} />
      <Route path={routes.CONTACT} component={Contact} />
    </Switch>
  );
};

export default Main;
