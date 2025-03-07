import React, { Suspense, lazy } from "react";
import { Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";
const Home = lazy(() => import("./components/Home"));
const Recommend = lazy(() => import("./components/Recommend"));

function App() {
  return (
    <div className="App">
      <Suspense
        fallback={
          <div
            style={{
              fontSize: 25,
              backgroundColor: "#ff0000",
              color: "#ffffff",
            }}
          >
            Loading...
          </div>
        }
      >
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/browse" component={Home} />
        <Route
          exact
          path="/recommend"
          render={(props) => <Recommend {...props} />}
        />
      </Suspense>
    </div>
  );
}

export default App;
