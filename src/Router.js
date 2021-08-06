import "./Routes.css";
import ContextProvider from "./context/ContextProvider";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import EditProduct from "./pages/EditProduct";
import NewProduct from "./pages/NewProduct";
import EditProfile from "./pages/EditProfile";
import Home from "./pages/Home";
import Stores from "./pages/Stores";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

function ProtectedRoutes(props) {
  return (
    <Route
      render={() =>
        localStorage.getItem("TOKEN") ? (
          props.children
        ) : (
          <Redirect to="/produtos" />
        )
      }
    />
  );
}

function Routes() {
  return (
    <div className="App">
      <ContextProvider>
        <Router>
          <div className="main">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/lojas" component={Stores} />
              <Route path="/login" component={Login} />
              <Route path="/cadastro" component={Register} />
              <ProtectedRoutes>
                <Route path="/perfil" exact component={Profile} />
                <Route path="/perfil/editar" component={EditProfile} />
                <Route path="/produtos" exact component={Products} />
                <Route path="/produtos/novo" component={NewProduct} />
                <Route path="/produtos/:id/editar" component={EditProduct} />
              </ProtectedRoutes>
            </Switch>
          </div>
        </Router>
      </ContextProvider>
    </div>
  );
}

export default Routes;
