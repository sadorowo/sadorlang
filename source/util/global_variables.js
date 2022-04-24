const { memory } = require('../run');

memory['Console'] = {
    value: {
        'Println': {
            value: function (...text) {
                return console.log(text.join('').replace(/\\n/g, '\n'))
            },
            arguments: ['text']
        }
    },
    mutable: false 
}

memory['Formatter'] = {
    value: {
        'FormatString': {
            value: function (...format) {
                let [string, ...args] = format;
                
                for (const argument of args) {
                    string = string.replace('$', argument)
                }

                return string
            },
            arguments: ['text']
        }
    }
}

memory['Random'] = {
    value: {
        'Choice': {
            value: function (...choices) {
                return choices[Math.floor(Math.random() * choices.length)]
            },
            arguments: ['choices']
        },
        'Int': {
            value: function (min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min + 1)) + min;
            },
            arguments: ['min', 'max']
        }
    }
}