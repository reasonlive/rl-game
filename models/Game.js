const yup = require('yup');



let schema = yup.object().shape({
	startDate: yup.date().required(),
	endDate: yup.date(),
	players: yup.array(),
	winner: yup.string(),
	finished: yup.boolean().required(),
	//history: yup.array()

})



module.exports = schema;


/*const Game = {
	startDate: new Date(),
	endDate: new Date(),
	players: ['users'],
	winner: 'user',
	history: [
	{'1': 
		{
			username: 'name',
			usercard: 'card'
		
		}
	}]
}*/