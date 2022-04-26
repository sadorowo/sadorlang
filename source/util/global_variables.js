const { memory } = require('../run');

memory['Random'] = {
	value: {
		Choice: {
			value: function (choices) {
				return choices[Math.floor(Math.random() * choices.length)];
			},
			arguments: ['choices'],
		},
		Int: {
			value: function (min, max) {
				min = Math.ceil(min);
				max = Math.floor(max);
				return Math.floor(Math.random() * (max - min + 1)) + min;
			},
			arguments: ['min', 'max'],
		},
	},
};

memory['Sys'] = {
	value: {
		Printf: {
			value: function (...format) {
				let [string, ...args] = format;

				for (const argument of args) {
					string = string
						.replace(`$(${args.indexOf(argument)})`, argument)
						.replace(/\\n/g, '\n');
				}

				return console.log(string);
			},
			arguments: ['string', 'args'],
		},
		Fmt: {
			value: function (...format) {
				let [string, ...args] = format;

				for (const argument of args) {
					string = string
						.replace(`$(${args.indexOf(argument)})`, argument)
						.replace(/\\n/g, '\n');
				}

				return string;
			},
			arguments: ['string', 'args'],
		},
		Exit: {
			value: function (code) {
				return process.exit(code);
			},
			arguments: [],
		},
	},
};
