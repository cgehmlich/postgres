const settings = require("./settings"); // settings.json
const moment = require('./moment');
const knex = require('knex')({
    client: 'pg',
    version: '7.2',
    connection: {
        user: settings.user,
        password: settings.password,
        database: settings.database,
        host: settings.hostname,
        port: settings.port,
        ssl: settings.ssl
    }
});
const args = process.argv[2];
knex.select('*').from('famous_people').where({ first_name: args }).orWhere({ last_name: args }).then(function (result) {

    console.log(`Found ${result.length} person(s) by the name ${args}:`)
    let i = 1;
    result.forEach(row => {
        console.log(`${i}: ${row.first_name} ${row.last_name}, born ${moment(row.birthdate).format('YYYY-MM-DD')}`)
        i++;
    })
    knex.destroy();
})


