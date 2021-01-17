import React, {Fragment} from 'react';
import Button from './components/Styled/Button';

const Tests = () =>{
	return (
		<Fragment>
			<div>message from tests</div>
			<Button
			size='small'
			status="primary"
			text='hello button'
			font='primary'
			 />
		</Fragment>
	)
}


export default Tests;
