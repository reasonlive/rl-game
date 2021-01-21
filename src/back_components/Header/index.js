//Header

import React ,{Fragment,Component} from 'react';
import styled from 'styled-components';
import * as styles from '../../utils/styles';
import Button from '../Button';

//gets store to watch for logged status
import {connect} from 'react-redux';

const updateLogged = (state) => {
	return {
		logged: state.logged
	}
}


//bgcolor,title,logged
class Header extends Component{
	constructor(props){
		super(props);
	}

	handleLeftButton = ()=>{

		if(this.props.logged)window.document.location = '/offerground';
		else window.document.location = '/registration';
		//if logged
	}

	handleRightButton = ()=>{


		if(this.props.logged){
			localStorage.removeItem('name');
			window.document.location = '/logout';

		}
		else window.document.location = '/login';
		//if logged

	}

	render(){

		let {
			title,
			bgcolor,
			logged
		} = this.props;

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
						action={this.handleLeftButton}
						
						 />

						 <Button
						text={logged ? 'logout' : 'login'}
						size='large'
						status="primary"
						font={styles.fonts['primary']['medium_s']}
						action={this.handleRightButton}
						 />

					</ButtonBlock>
				

				 
					</StyledHeader>
				</Fragment>

			)


	}



}


	


	
export default connect(updateLogged,undefined)(Header)
//export default Header;
