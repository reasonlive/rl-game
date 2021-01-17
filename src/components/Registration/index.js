import React,{Fragment} from 'react';
import styled from 'styled-components';
import * as styles from '../../utils/styles';
import {RegisterForm} from '../Form';

const Main = styled.div`
display:grid;
grid-template-columns: 150px auto 150px;
`

const StyledRegistration = styled.div`
margin-top:10px;
grid-column-start:2;
grig-column-end:3;
display:flex;
justify-content:center;
align-items:center;
border-radius:10px;
height:500px;

background-color:rgba(0,0,0,0.6);
color:white;
font: ${styles.fonts['primary']['medium_l']};
text-align:center;

`


const Registration = () => {

	function onSub(data){
		console.log(data)
	}


	return (
		<Main>
			<StyledRegistration>
				<RegisterForm />
			</StyledRegistration>
		</Main>		
	
	)
}

export default Registration;