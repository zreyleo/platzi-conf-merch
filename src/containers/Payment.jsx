import React, { useContext } from 'react';
import { PayPalButton } from 'react-paypal-button';

import AppContext from '../context/AppContext';

import '../styles/components/Payment.css';

const Payment = ({ history }) => {
  const { state, addNewOrder } = useContext(AppContext);

  const { cart, buyer } = state;

  const paypalOptions = {
    clientId:
      'ASiZ6VmubkpKVhbd50nknhl57go5MC4cjaijEOCE9f7CEIWH8Lm1Ob6tISDxWWMcZKfQ4yhsXDXh6xwW',
    intent: 'capture',
    currency: 'USD',
  };

  const buttonStyles = {
    layout: 'vertical',
    shape: 'rect',
  };

  const handleSumTotal = () => {
    const reducer = (accumulator, currentValue) =>
      accumulator + currentValue.price;
    const sum = cart.reduce(reducer, 0);
    return sum;
  };

  const handlePaymentSuccess = (data) => {
    if (data.status === 'COMPLETED') {
      const newOrder = {
        buyer,
        products: cart,
        payment: data,
      };
      addNewOrder(newOrder);
      history.push('/checkout/success');
    }
  };

  return (
    <div className="Payment">
      <div className="Payment-content">
        <h3>Resumen del Pedido</h3>
        {cart.map((item) => (
          <div key={item.title} className="Payment-item">
            <div className="Payment-element">
              <h4>{item.title}</h4>
              <span>{`$${item.price}`}</span>
            </div>
          </div>
        ))}
        <div className="Payment-button">
          <PayPalButton
            paypalOptions={paypalOptions}
            buttonStyles={buttonStyles}
            amount={handleSumTotal()}
            onPaymentStart={() => console.log('start payment')}
            onPaymentSuccess={(data) => handlePaymentSuccess(data)}
            onPaymentError={(error) => console.log(error)}
            onPaymentCancel={(data) => console.log(data)}
          />
        </div>
      </div>
    </div>
  );
};

export default Payment;
