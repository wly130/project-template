import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import { HashRouter as Router, Route, Link } from "react-router-dom";
//BrowserRouter 和 HashRouter
//引入路由表
import routes from "./routers";

function RouterList() {
    return (
        <Router>
            {
                routes.map(({ path, component, exact }, key) => {
                    return (
                        <Route exact={exact} key={key} path={path} component={component} />
                    )
                })
            }
        </Router>
    );
}

export default RouterList;