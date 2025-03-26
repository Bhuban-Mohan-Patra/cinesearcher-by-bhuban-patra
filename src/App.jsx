import Header from "components/commons/Header";
import Favourites from "components/Favourites";
import { Route, Switch } from "react-router-dom";

import "./App.css";
import Home from "./components/Home";
import routes from "./routes";

const App = () => (
  <>
    <Header />
    <Switch>
      <Route exact component={Home} path={routes.root} />
      <Route exact component={Favourites} path={routes.favourites} />
      {/* <Redirect exact from={routes.root} to={routes.root} /> */}
      {/* <Route component={PageNotFound} path="*" /> */}
    </Switch>
  </>
);

export default App;
