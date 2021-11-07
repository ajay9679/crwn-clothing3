import React from 'react';
import './sign-up.styles.scss';

import CustomButton from '../custom-button/custom-button.component.js';
import FormInput from '../form-input/form-input.component.js';

import {auth, createUserProfileDocument} from '../../firebase/firebase.utils.js';

class SignUp extends React.Component{
	constructor(){
		super();
		this.state = {
			displayName: '',
			email: '',
			password: '',
			confirmPassword: ''
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	async handleSubmit(e){
		e.preventDefault();
		const {displayName, email, password, confirmPassword} = this.state;
		if(password !== confirmPassword){
			alert('password don\'t match');
			return;
		}
		try{
			const {user} = await auth.createUserWithEmailAndPassword(email, password);
			await createUserProfileDocument(user, {displayName});
			this.setState({
				displayName: '',
				email: '',
				password: '',
				confirmPassword: '',
			});
		}catch(err){
			console.error(err.message);
		}
	}

	handleChange(e){
		const {name, value} = e.target;
		this.setState({[name]: value});
	}

	render(){
		const {displayName, email, password, confirmPassword} = this.state;
		return <div className='sign-up'>
			<h2 className='title'>I do not have a account</h2>
			<span>Sign up with your email and password</span>
			<form className='sign-up-form' onSubmit={this.handleSubmit} >
				<FormInput type='text' name='displayName' value={displayName} onChange={this.handleChange} label='Display Name' required />
				<FormInput type='email' name='email' value={email} onChange={this.handleChange} label='Email' required />
				<FormInput type='password' name='password' value={password} onChange={this.handleChange} label='Password' required />
				<FormInput type='password' name='confirmPassword' value={confirmPassword} onChange={this.handleChange} label='Confirm Password' required />
				<CustomButton type='submit'>SIGN UP</CustomButton>
			</form>
		</div>
	}
}

export default SignUp;
