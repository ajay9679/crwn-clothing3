import  React from 'react';
import './header.styles.scss';
import {ReactComponent as Logo} from '../../assets/crown.svg';

import CartIcon from '../cart-icon/cart-icon.component.js';
import CartDropdown from '../cart-dropdown/cart-dropdown.component.js';

import {Link} from 'react-router-dom';

import {auth} from '../../firebase/firebase.utils.js';

import {connect} from 'react-redux';
import {selectCurrentUser} from '../../redux/user/user.selectors.js';
import {selectCartHidden} from '../../redux/cart/cart.selectors.js';
import {createStructuredSelector} from 'reselect';

const Header = ({currentUser, hidden}) => {

	return <div className='header'>
		<Link className='logo-container' to='/'>
			<Logo className='logo' />
		</Link>
		<div className='options'>
			<Link className='option' to='/shop'>SHOP</Link>
			<Link className='option' to='/shop'>CONTACT</Link>
			{
				currentUser ? <div className='option' onClick={() => auth.signOut()}>SIGN OUT</div> : <Link className='option' to='/signin'>SIGNIN</Link>
			}
			<CartIcon />
		</div>
		{!hidden && <CartDropdown />}
	</div>
};

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	hidden: selectCartHidden
});

export default connect(mapStateToProps, null)(Header);
