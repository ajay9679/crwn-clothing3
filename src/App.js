import React from 'react';
import './App.css';
import {Switch, Route, Redirect} from 'react-router-dom';
import Header from './components/header/header.component.js';

import {auth, createUserProfileDocument} from './firebase/firebase.utils.js';

import HomePage from './pages/homepage/homepage.component.js';
import ShopPage from './pages/shop/shop.component.js';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.js';
import CheckoutPage from './pages/checkout/checkout.component.js';

import {connect} from 'react-redux';
import {setCurrentUser} from './redux/user/user.actions.js';
import {selectCurrentUser} from './redux/user/user.selectors.js';
import {createStructuredSelector} from 'reselect';

class App extends React.Component{
	unsubscribeFromAuth = null;

	componentDidMount(){
		const {setCurrentUser} = this.props;
		this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
			if(userAuth){
				const userRef = await createUserProfileDocument(userAuth);
				userRef.onSnapshot(snapShot => {
					setCurrentUser({
						id: snapShot.id,
						...snapShot.data(),
					});
				});
			}else{
				setCurrentUser({currentUser: userAuth});
			}
			
			// addCollectionAndDocuments('collections', collectionsArray.map(({title, items}) => ({title, items})));
		});
	}

	componentWillUnmount(){
		this.unsubscribeFromAuth();
	}

	render(){
		console.log(this.props.currentUser)
		return <div className='App'>
    		<Header />
        	<Switch>
        		<Route exact path='/' component={HomePage} />
        		<Route path='/shop' component={ShopPage} />
        		<Route exact path='/signin' render={() => this.props.currentUser ? <Redirect to='/' /> : <SignInAndSignUpPage />} />
        		<Route path='/checkout' component={CheckoutPage} />
        	</Switch>
    	</div>
	}
}

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
	setCurrentUser: user => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
