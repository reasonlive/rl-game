//Header

import React ,{Fragment} from 'react';
import styled from 'styled-components';
import * as styles from '../../utils/styles';
import Button from '../Button';

//for auto update logged state
import {connect} from 'react-redux';
import store from '../../store';


//checks if user logged
const updateLogged = () => {
	return {
		logged: store.getState().logged
	}
}


const Header = ({bgcolor, title,logged}) =>{

	


	const StyledHeader = styled.header`
	position:relative;
	width:100%;
	height:100px;
	background-color: ${styles.bgColors[bgcolor]};
	display:flex;
	align-items:center;
	justify-content:flex-end;
	z-index:100;

	`

	const ButtonBlock = styled.div`
	display:flex;
	justify-content:space-around;
	align-items:center;
	width:400px;
	login
	`

	const StyledTitle = styled.h1`

	cursor:pointer;
	font: ${typeof title == 'object' 
	? styles.fonts[title.font][title.size] 
	: ''}

	`

	const handleLeftButton = () =>{
		
		if(logged)window.document.location = '/offerground';
		else window.document.location = '/registration';
		//if logged
	}

	const handleRightButton = () =>{
		
		if(logged)window.document.location = '/logout';
		else window.document.location = '/login';
		//if logged
	}



	return (
		<Fragment>
			<StyledHeader>
				<StyledTitle onClick={()=> window.document.location = '/'}>
					{typeof title == 'object' ? title.text : title}
				</StyledTitle>
				
				<ButtonBlock>

					 <Button
					text={logged ? 'offerground' : 'registration'}
					size='large'
					status="primary"
					font={styles.fonts['primary']['medium_s']}
					action={handleLeftButton}
					
					 />

					 <Button
					text={logged ? 'logout' : 'login'}
					size='large'
					status="primary"
					font={styles.fonts['primary']['medium_s']}
					action={handleRightButton}
					 />

				</ButtonBlock>
				

			 
			</StyledHeader>
		</Fragment>
	)
}

export default connect(updateLogged,undefined)(Header)
//export default Header;
