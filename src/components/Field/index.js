//CustomField

import React, {Fragment} from 'react';
import styled from 'styled-components';
import * as styles from '../../utils/styles';



const CustomField = ({type,name,placeholder,label}) =>{

	const StyledField = styled.input`
	
	width:300px;
	height:50px;
	background-color:black;
	color:white;
	border:0;outline:0;
	font: ${styles.fonts['primary']['medium_m']};
	text-align:center;
	&::placeholder{
		color:rgba(34,220,34,0.4);
		font: ${styles.fonts['primary']['medium_s']}
	}
	&:focus{
		&::placeholder{
			color:black;
		}
	}


	`
	let fieldBlockCss = {
		
		width:300
	}

	return (
		<Fragment>
			<div style={fieldBlockCss}>
				{label ? <label style={{font: styles.fonts['game']['medium_s']}}
				>{label}</label> : ''}
				<StyledField name={name} type={type} placeholder={placeholder} />
			</div>
			
		</Fragment>
	)
}

export default CustomField;