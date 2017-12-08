import React from "react"
import OrderComponent from "./Component";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import axios from "axios";
import Datetime from "react-datetime";
import PaypalExpressBtn from './PayPalExpressCheckOut';

require('moment/locale/pt-br');

class OrderContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ...props.order,
            customer: {
                name: "",
                phone: "",
                email: "",
                pickUpTime: null
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.placeOrder = this.placeOrder.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);

    }

    generateOrder() {
        return this.props.order.items.map((item, index) => {
            return <OrderComponent key={item.cupcake + index} item={item} index={index}/>
        })
    }

    handleChange(event) {
        event.persist();
        this.setState((prevState) => {
            return {
                ...prevState,
                customer: {
                    ...prevState.customer,
                    [event.target.name]: event.target.value
                }
            }
        })
    }
    handleDateChange(mnt) {
        this.setState((prevState) => {
            return {
                ...prevState,
                customer: {
                    ...prevState.customer,
                    pickUpTime: mnt._d
                }
            }
        })
    }

    placeOrder() {
        axios.post('/order/', this.state).then(response => {
            console.log(response.data);
            this.props.history.push(`/confirmation/${response.data._id}`);
        })
    }

    render() {
        const onSuccess = (payment) => {
            console.log("Your payment was succeeded!", payment);
            this.placeOrder()

        }
        const onCancel = (data) => {
            // User pressed "cancel" or close Paypal's popup!
            console.log('You have cancelled the payment!', data);
        }
        const onError = (err) => {
            // The main Paypal's script cannot be loaded or somethings block the loading of that script!
            console.log("Error!", err);
            // Since the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
            // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
        }
        let currency = 'BRL'; // or you can set this value from your props or state
        let total = this.props.order.totalCost;
        const yesterday = Datetime.moment().subtract(1, 'day');
        const valid = function(current) {
            return current.isAfter(yesterday) && current.day() !== 1 && current.day() !== 2;
        };

        return (
            <div className="orderReview">
                <h3>Your order below:</h3>
                <h2 className="reviewTopBar">Cupcake</h2>
                <h2 className="reviewTopBar">Quantity</h2>
                <div>
                    {this.generateOrder()}
                    <h4 className="totalCost">Total: R${this.props.order.totalCost}</h4>
                </div>
                <hr/>
                <form className="formularioBox">
                    <label>Pick Up Date and Time:
                    </label>
                    <br/>
                    <Datetime inputProps={{
                        placeholder: "Date and Time"
                    }} className="datepicker" locale="pt-br" timeConstraints={{
                        hours: {
                            min: 14,
                            max: 20
                        },
                        minutes: {
                            step: 10
                        }
                    }} isValidDate={valid} dateFormat="dddd, Do MMMM YYYY" onChange={this.handleDateChange} value={this.state.customer.pickUpTime} name="pickUpTime"/>
                    <br/>
                    <label>Nome:
                    </label>
                    <br/>
                    <input className="formulario" onChange={this.handleChange} value={this.state.customer.name} name="name" type="text" placeholder="Nome"/>
                    <br/>
                    <label>
                        <i className="fa fa-lg fa-phone" aria-hidden="true"></i>
                    </label>
                    <br/>
                    <input className="formulario" onChange={this.handleChange} value={this.state.customer.phone} name="phone" type="tel" placeholder="Telefone"/>
                    <br/>
                    <label>Email:
                    </label>
                    <br/>
                    <input className="formulario" onChange={this.handleChange} value={this.state.customer.email} name="email" type="email" placeholder="Email"/>

                    <br/>
                </form>
                <PaypalExpressBtn currency={currency} total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel}/>
                <div className="placeOrder">
                    <Link to="/cupcakes">
                        <button className="placeOrderButtons">
                            <i className="fa fa-chevron-left" aria-hidden="true"></i>
                        </button>
                    </Link>
                    {/*<button className="placeOrderButtons" onClick={this.placeOrder}>Place order</button>*/}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state
}
export default connect(mapStateToProps, null)(OrderContainer);
