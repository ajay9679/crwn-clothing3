import React from 'react';
import './cart-dropdown.styles.scss';

import {withRouter} from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component.js';
import CartItem from '../cart-item/cart-item.component.js';

import {connect} from 'react-redux';
import {selectCartItems} from '../../redux/cart/cart.selectors.js';
import {createStructuredSelector} from 'reselect';
import {toggleCartHidden} from '../../redux/cart/cart.actions.js';

const CartDropdown = ({cartItems, history, dispatch}) => {

	return <div className='cart-dropdown'>
		<div className='cart-items'>
			{
				cartItems.length ? cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem} />) : <span className='empty-message'>Your Cart is Empty.</span>
			}
		</div>
		<CustomButton onClick={() => {
			history.push('/checkout');
			dispatch(toggleCartHidden());
		}} >
			Go To Checkout
		</CustomButton>
	</div>
};

const mapStateToProps = createStructuredSelector({
	cartItems: selectCartItems,
});

export default withRouter(connect(mapStateToProps, null)(CartDropdown));
