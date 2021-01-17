import React,{Fragment} from 'react';
import * as styles from '../../utils/styles';




const Button = ({status,action,text,size,onHover,font})=> {
	//width,height,font
	let w,h;
	switch(size){
		case 'small': w = 70;h = 40;break;
		case 'medium': w = 100;h = 50;break;
		case 'large': w = 150;h = 60;break;
		default: w = 0, h = 0;
	}


let buttonCss = {
	color:'white',
	width: w,
	height: h,
	outline:0,
	border:0,
	padding:5,
	borderRadius: 5,
	font: font ? styles.fonts[font][size] : styles.fonts.primary[size],
	backgroundColor: styles.itemColors[status],
	cursor: 'pointer'
}


return (
	<Fragment>
		<button
		 onClick={action}
		 onMouseOver={onHover}
		 style={buttonCss}
		 >{text}</button>
	</Fragment>
)


}

export default Button;
