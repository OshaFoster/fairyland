import React from "react";
import AdminComponent from "./Component";
import axios from "axios";
import {connect} from "react-redux";
import * as actions from "../../../redux/auth";

class ListComponent extends React.Component{
    constructor(props) {
        super();
        this.state = {
            order: []
        };
        this.handleEdit = this.handleEdit.bind(this);
    }
    
    componentDidMount() {
        this.props.verify();  
        axios.get(`/admin/orders`).then(response => {
            this.setState({order: response.data});
        })
    }
  
    handleEdit(event, id) {
        event.persist();
        axios.put("/admin/orders/" + id, {
            completed: event.target.checked
        })
        .then((response) => {
            this.setState((prevState) => {
                let updatedOrder = [...prevState.order];
                updatedOrder = updatedOrder.map(order => {
                    if (order._id === id) {
                        return response.data
                    } else {
                        return order
                    }
                })
                return {
                    order: updatedOrder
                }
            })
        })
    }
  
    render(){
        return(
            <div className="omsBackground">
                {this.state.order.sort((a, b)=>{
                    let firstTime = new Date(a.customer.pickUpTime).getTime();
                    let secondTime = new Date(b.customer.pickUpTime).getTime();
                    return firstTime - secondTime;
                }).map((order)=>{
                    return(    
                        <AdminComponent 
                            order={order} 
                            key={order._id}
                            id={order._id}
                            handleEdit={this.handleEdit}/>            
                    )
                })
              }
            </div>
        )
    }
}

export default connect(null, actions)(ListComponent);