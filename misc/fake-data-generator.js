/* Populates test data into MongoDB */
/* Code source: http://james.padolsey.com/javascript/random-word-generator/ */

var db = require('../server/database');

function createRandomWord(length) {
    var consonants = 'bcdfghjklmnpqrstvwxyz',
        vowels = 'aeiou',
        rand = function(limit) {
            return Math.floor(Math.random() * limit);
        },
        i, word = '',
        length = parseInt(length, 10),
        consonants = consonants.split(''),
        vowels = vowels.split('');
    for (i = 0; i < length / 2; i++) {
        var randConsonant = consonants[rand(consonants.length)],
            randVowel = vowels[rand(vowels.length)];
        word += (i === 0) ? randConsonant.toUpperCase() : randConsonant;
        word += i * 2 < length - 1 ? randVowel : '';
    }
    return word;
};

/*===============================================
=            Populate User fake data            =
===============================================*/
/* Number of test records to be generated */
var numTestDocs = 20;

var User = db.users;
for (var i = 0; i < numTestDocs; i++) {
    var wordLength = 8;
    var item = new User();

    item.firstName = createRandomWord(wordLength);
    item.lastName = createRandomWord(wordLength);
    item.email = createRandomWord(wordLength);
    item.phone = (Math.floor((Math.random() * 100000) + 1)).toString();
    item.country = createRandomWord(wordLength);
    item.street1 = createRandomWord(wordLength);
    item.street2 = createRandomWord(wordLength);
    item.state = createRandomWord(wordLength);
    item.zip = Math.floor((Math.random() * 100) + 1);
    item.password = createRandomWord(wordLength);

    item.save(function(err) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Record saved');
    });
}

/*=====  End of Populate User fake data  ======*/

/*=====================================================
=            Populate Controller fake data            =
=====================================================*/

var Controller = db.controllers;
for (var i = 0; i < numTestDocs; i++) {
    var wordLength = 8;
    var item = new Controller();

    item.make = createRandomWord(wordLength);
    item.model = createRandomWord(wordLength);
    item.version = Math.floor((Math.random() * 100) + 1);

    item.save(function(err) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Record saved');
    });
}

/*=====  End of Populate Controller fake data  ======*/

/*=================================================
=            Populate Device fake data            =
=================================================*/

var Device = db.devices;
for (var i = 0; i < numTestDocs; i++) {
    var wordLength = 8;
    var item = new Device();

    item.name = createRandomWord(wordLength);
    item.description = createRandomWord(wordLength) + ' is a description';
    item.location = createRandomWord(wordLength);
    item.type = createRandomWord(wordLength);

    item.save(function(err) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Record saved');
    });
}

/*=====  End of Populate Device fake data  ======*/
