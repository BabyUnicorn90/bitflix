// 오로지 라우터만 관리하는 컴포넌트!

import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Header";

import Movie from "../routes/Movie";
import Detail from "../routes/Detail";
import Search from "../routes/Search";
import TV from "../routes/TV";

export default () => (
  <Router>
    <>
      <Header />
      {/* switch의 역할: 하나의 router만 태우게 하기 위해서 */}
      <Switch>
        <Route path="/" exact component={Movie} />
        <Route path="/tv" exact component={TV} />
        <Route path="/search" exact component={Search} />
        <Route path="/movie/:id" exact component={Detail} />
        <Route path="/show/:id" exact component={Detail} />
      </Switch>
    </>
  </Router>
);
