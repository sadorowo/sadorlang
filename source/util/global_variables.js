const { memory } = require('../run');

memory['Console'] = {
    value: {
        'Println': {
            value: function (...text) {
                console.log(...text)
            },
            arguments: ['text']
        }
    },
    mutable: false 
}