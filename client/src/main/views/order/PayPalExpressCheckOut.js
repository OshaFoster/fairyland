import React from 'react';
import ReactDOM from 'react-dom';
import scriptLoader from 'react-async-script-loader';
import PropTypes from 'prop-types';
 
class PaypalButton extends React.Component {
  constructor(props) {
    super(props);
    window.React = React;
    window.ReactDOM = ReactDOM;
    this.state = {
      showButton: false,
      env: 'sandbox', // Or 'sandbox'
      client: {
        sandbox:    'AbLJeEIqN0CMQ2NKrBwUA5ZEH4JWPTMhTbe-6Wu0WfDbb0Zzjz69OEECy5m4lr1eoIKfBYTjPnm3lU6b', // sandbox client ID
        production: 'AUUZW6xTiPMVOnblHpk3MUVepgkoXv9McJN9Of7l6Mu8LpoxbkJxUhRKZw8VnaFx384fOSO3Pbt-zlwY' // production client ID
      },
      commit: true, // Show a 'Pay Now' button
    };
  }
  componentDidMount() {
    const { isScriptLoaded, isScriptLoadSucceed } = this.props;
    if (isScriptLoaded && isScriptLoadSucceed) {
      this.setState({ showButton: true });
    }
  }
  componentWillReceiveProps({ isScriptLoaded, isScriptLoadSucceed }) {
    if (!this.state.show) {
      if (isScriptLoaded && !this.props.isScriptLoaded) {
        if (isScriptLoadSucceed) {
          this.setState({ showButton: true });
        } else {
          console.log('Cannot load Paypal script!');
          this.props.onError();
        }
      }
    }
  }
 
  render() {
    const payment = () => window.paypal.rest.payment.create(this.state.env, this.state.client, {
      transactions: [
                    { amount: { total: this.props.total, currency: this.props.currency } },
      ],
    });
    console.log(window.paypal);
    const onAuthorize = (data, actions) => {
        actions.payment.execute().then(() => {
      const payment = Object.assign({}, this.props.payment);
      payment.paid = true;
      payment.cancelled = false;
      payment.payerID = data.payerID;
      payment.paymentID = data.paymentID;
      payment.paymentToken = data.paymentToken;
      payment.returnUrl = data.returnUrl;
      this.props.onSuccess(payment);
    })
};
 
    let ppbtn = '';
    if (this.state.showButton) {
        let Button = window.paypal.Button.react;
        ppbtn = (<Button
            style= {{
        size: 'medium',
        color: 'blue',
        shape: 'rect',
        label: 'pay'
    }}
        locale= {'pt_BR'}
        
        env={this.state.env}
        client={this.state.client}
        payment={payment}
        commit
        onAuthorize={onAuthorize}
        onCancel={this.props.onCancel}
      />);
    }
    return <div>{ppbtn}</div>;
  }
}
 
PaypalButton.propTypes = {
  currency: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired
};
 
PaypalButton.defaultProps = {
  env: 'sandbox',
  onSuccess: (payment) => {
    console.log('The payment was succeeded!', payment);
  },
  onCancel: (data) => {
    console.log('The payment was cancelled!', data);
  },
  onError: (err) => {
    console.log('Error loading Paypal script!', err);
  },
};
 
export default scriptLoader('https://www.paypalobjects.com/api/checkout.js')(PaypalButton);