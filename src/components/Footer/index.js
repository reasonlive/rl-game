//Footer

import React ,{Fragment} from 'react';
import styled from 'styled-components';
import * as styles from '../../utils/styles';

const Footer = ({theme}) =>{

	const StyledHeader = styled.footer`
	width:100%;
	height:10%;
	background-color: ${styles.bgColors[theme]};

	`
	return (
		<Fragment>
			<StyledHeader>
				
			</StyledHeader>
		</Fragment>
	)
}

export default Footer;