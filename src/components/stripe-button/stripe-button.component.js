import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) => {
	const priceForStripe = price * 100;
	const publishableKey = 'pk_test_51JnwF3SIYz6HKJhvg5RaUeq5oaszHsQQbPbv5pXUTQFPW2TxIShHTxkKYGXlUbfbIBhMqxLNQcMMsvltZqAURpRl00a4Xe1Fej';
	const onToken = token => {
		console.log(token);
		alert('Payment Successfull');
	}

	return <StripeCheckout label='Pay Now' name='CRWN Clothing Ltd.' billingAddress shippingAddress image='https://svgshare.com/i/CUz.svg' description={`Your total is $${price}`} amount={priceForStripe} panelLabel='Pay Now' token={onToken} stripeKey={publishableKey} />
};

export default StripeCheckoutButton;