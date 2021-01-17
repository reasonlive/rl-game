import React, {Fragment} from 'react';
import {Form,Field} from 'react-final-form';
import styled from 'styled-components';
import * as styles from '../../utils/styles';

import Button from '../Button';
import store from '../../store';


const FormWrapper = styled.div`
	display: flex;
	justify-content: center;
	width:400px;
	height:400px;
	background:transparent;
	& input{
		text-align:center;
		outline:0;border:0;
		height:50px;
		width:300px;
		margin:5px;
		background-color: ${styles.itemColors['primary']};
		font: ${styles.fonts['primary']['medium_m']};
		color:black;
	}
	& input::placeholder{
		color:rgba(0,0,0,0.4);

	}
	& input:focus{
		background-color:orange;
		&::placeholder{
			color:transparent;
		}
	}
`


function onSubmit(data){
		
		let validated = validate(data);
		if(!validated){
			alert('you put wrong data');
			return false;
		}
		
		return false;
}

function validate(data){
	if(data.email &&
	 data.email.match(/[a-zA-Z0-9\-_]{3,15}@[a-z]{3,12}\.[a-z]{2,6}/) && 
	 data.password && data.password.match(/.{8,50}/)){
		return true;
	}
	else return false;
}



const RegisterForm = () => {

	return (
		
		<FormWrapper>
		
			<Form onSubmit={onSubmit} 
			render={
				({handleSubmit,form,submitting,pristine,values}) => (
					<form onSubmit={handleSubmit} className='form'>
						<div>
						<label>type your name</label>
						
						<Field 
						component='input'
						type='text'
						name='username'
						placeholder='username'
						/>
						</div>

						<div>
						<label>type your email</label>
						<Field 
						component='input'
						type='text'
						name='email'
						placeholder='email'
						
						/>
						</div>

						<div>
						<label>create password</label>
						<Field 
						component='input'
						type='password'
						name='password'
						placeholder='password'

						/>
						</div>


						 <div style={
						 	{
						 		display:'flex',
						 		justifyContent: 'space-around',
						 		marginTop: 20
						 	}
						 }>

						 <Button 
						 submit
						 size='medium'
						 status='attention'
						 text='submit'
						 font='1.4rem Verdana, sans-serif'
						 />

						 <Button 
						 
						 size='medium'
						 status='attention'
						 text='reset'
						 font='1.4rem Verdana, sans-serif'
						 action={form.reset}
						 />
						 
	
						 </div>

						 
					</form>
				)
			}

			/>
			
		</FormWrapper>
	)
}



//This form for login actions
const LoginForm = () => {

	return (
		
		<FormWrapper>
		
			<Form onSubmit={onSubmit} 
			render={
				({handleSubmit,form}) => (
					<form onSubmit={handleSubmit} className='form'>

						<div>
						<label>type your email</label>
						<Field 
						component='input'
						type='text'
						name='email'
						placeholder='email'
						
						/>
						</div>

						<div>
						<label>type your password</label>
						<Field 
						component='input'
						type='password'
						name='password'
						placeholder='password'

						/>
						</div>


						 <div style={
						 	{
						 		display:'flex',
						 		justifyContent: 'space-around',
						 		marginTop: 20
						 	}
						 }>

						 <Button 
						 submit
						 size='medium'
						 status='attention'
						 text='submit'
						 font='1.4rem Verdana, sans-serif'
						 />

						 <Button 
						 
						 size='medium'
						 status='attention'
						 text='reset'
						 font='1.4rem Verdana, sans-serif'
						 action={form.reset}
						 />
						 
	
						 </div>

						 
					</form>
				)
			}

			/>
			
		</FormWrapper>
	)
}






export {RegisterForm,LoginForm};
