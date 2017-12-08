import React from "react";
import {Link} from "react-router-dom";
import CupcakesComponent from "./Component"
import axios from "axios";
import {connect} from "react-redux";
// import * as actions from "../../../redux/orders";
// import OrderComponent from "../order/Component";

class CupcakesContainer extends React.Component{
  constructor(){
    super();
    this.state = {
      cupcakes: [],
      order: {}
    }
  }

  componentDidMount(){
      axios.get('/cupcake/').then(response => {
        this.setState({
          cupcakes: response.data.reverse()
        })
      })
    }


  genList(){
    return this.state.cupcakes.map((item)=>{
      return (
        <CupcakesComponent cupcake={item} key={item._id} />
      )
    })
  }



  render(){
    return(
      <div className="foodMenu">
          {this.genList()}
          <div className="reviewBox">
          <div className="reviewOrderButtonBox">
            <Link to="/order" style={{alignSelf: "center", display: "flex", justifyContent: "center"}} ><i className="basket fa fa-4x fa-shopping-basket"></i></Link>
            <br/>
            <Link to="/order" style={{alignSelf: "center", display: "flex", justifyContent: "center"}}><button onClick={()=>{window.scrollTo(0, 0);}}className="reviewOrderButton">Review Your Order</button></Link>
          </div>
          </div>
      </div>
    )
  }
}

const mapStateToProps = (state)=>{
  return state
}

export default connect(mapStateToProps, null) (CupcakesContainer);
