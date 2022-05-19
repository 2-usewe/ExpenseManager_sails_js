module.exports = {
	friendlyName: 'Create user',
	description: 'Create a new user.',

	inputs: {
       
		email: {
			type: 'string'
		},
		password: {
			type: 'string'
		},
	},
    exits: {
		invalid: {
			responseType: 'badRequest',
			description: 'The provided email address and/or password are invalid.',
		},
		emailAlreadyInUse: {
			statusCode: 409,
			description: 'The provided email address is already in use.',
		},
	},
    fn: async function(inputs, exits) {
		var attr = {
			id: sails.helpers.randomCryptoString({ size: 32 }).execSync(),
           
			email: inputs.email.toLowerCase(),
            password:inputs.password,
		}
    }
}