import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../pages/Home";
import Products from "../pages/Products";
import Contact from "../pages/Contact";
import routes from "../constants/routes.json";

const Main = (props) => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path={routes.PRODUCTS} component={Products} />
          <Route exact path={routes.CONTACT} component={Contact} />
          <Route path={routes.HOME} component={Home} />
        </Switch>
      </Router>
    </div>
  );
};

export default Main;
