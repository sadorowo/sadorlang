const { memory } = require('../run');

memory['Console'] = {
    'Println': {
        value: function (...text) {
            console.log(...text)
        },
        arguments: ['text']
    }
}