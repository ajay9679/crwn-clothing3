import React from 'react';
import './sign-in.styles.scss';

import FormInput from '../form-input/form-input.component.js';
import CustomButton from '../custom-button/custom-button.component.js';

import {auth, signInWithGoogle} from '../../firebase/firebase.utils.js';

class SignIn extends React.Component{
	constructor(){
		super();
		this.state = {
			email: '',
			password: '',
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	async handleSubmit(e){
		e.preventDefault();
		const {email, password} = this.state;
		try{
			await auth.signInWithEmailAndPassword(email, password);
			this.setState({email: '', password: ''});
		}catch(err){
			console.error(err.message);
		}
	}

	handleChange(e){
		const {value, name} = e.target;
		this.setState({[name]: value});
	}

	render(){
		return <div className='sign-in'>
			<h2>I already have an account</h2>
			<span>Sign in with your email and password</span>
			<form onSubmit={this.handleSubmit} >
				<FormInput type='email' name='email' value={this.state.email} label='email' required handleChange={this.handleChange} />

				<FormInput type='password' name='password' value={this.state.password} label='password' required handleChange={this.handleChange} />

				<div className='buttons'>
					<CustomButton type='submit'>Sign In</CustomButton>
					<CustomButton onClick={signInWithGoogle} isGoogleSignIn >{' '}Sign in with Google{' '}</CustomButton>
				</div>
			</form>
		</div>
	}
}

export default SignIn;
