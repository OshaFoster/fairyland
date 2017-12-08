import React from "react";
import axios from "axios";
import moment from "moment";

class ThankYou extends React.Component {
  constructor() {
    super()
    this.state = {
      order: {
        customer: {},
        items: []
      }
    }
  }

  componentDidMount() {
    axios.get(`/order/${this.props.match.params.id}`).then(response => {
      this.setState({order: response.data})
    })
  }


  render() {
    let show={
      display: "inherit"
    }
    let hide ={
      display: "none"
    }
    let newDateFormat = moment(this.state.order.customer.pickUpTime).format("dddd, D MMMM YYYY");
    let newTimeFormat = moment(this.state.order.customer.pickUpTime).format("h:mm")
console.log(this.state)
    return (
      <div className="thankYouBox">
        <h3>Your order has been confirmed!</h3>
        <h3>Order Number: {this.state.order._id}</h3>
        <br/>
          <h4 className="reviewTopBar">Cupcake</h4>
          <h4 className="reviewTopBar">Quantity</h4>
        {this.state.order.items.map(item=>{
          return(
            <div className="reviewOrderBox">
              <h4>{item.cupcake.title}</h4>
            <h4 style={item.quantity.mini? show:hide}>{item.quantity.mini}</h4>
            <h4 style={item.quantity.regular? show:hide}>{item.quantity.regular}</h4>
            </div>
          )
        })}
        <h4 className="totalCostThankYouPage">Total: R$ {this.state.order.totalCost}</h4>
        <h3 className="pickUpDay">Pick Up Day:</h3>
        <h4>{newDateFormat}</h4>
        <h3 className="pickUpDay">Pick Up Time:</h3>
        <h3>{newTimeFormat}</h3>
      </div>
    )
  }
}
export default ThankYou;
