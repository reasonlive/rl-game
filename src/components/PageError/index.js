import React from 'react';
import styled from 'styled-components';
import im404 from './im404.jpg';

const StyledError = styled.div`
width:100%;
height:600px;
background-color:black;
margin-top:-20px;
`

const StyledImage = styled.img`
width:100%;
height:100%;
`

const ErrorPage = ({error}) => {

	let image;
	switch(error){
		case 404: image = im404;break;
		default: image = null;
	}

	return (
		<div className='page-error'>
		
			<StyledError>
			<StyledImage src={image} />
			
			</StyledError>
		</div>
	)
}

export default ErrorPage;