import React from "react";
import {Switch, Route} from "react-router-dom";
import Home from "./views/Home";
import CupcakesContainer from "./views/cupcakes/Container";
import About from "./views/About";
import Navbar from "./Navbar";
import Footer from "./Footer";
import {Col, Row} from "react-bootstrap";

class App extends React.Component{
  render(){
    return(
      <div className="app-wrapper">
        <Row>
          <Col sm={12}>
              <Navbar/>
          </Col>
        </Row>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/cupcakes" component={CupcakesContainer}/>
            <Route path="/about" component={About}/>
        </Switch>
      <Footer/>
      </div>
    )
  }
}

export default App;