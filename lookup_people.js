const pg = require("pg");
const settings = require("./settings"); // settings.json
const moment = require('./moment');
const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});
const args = process.argv.slice(2);

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(`SELECT * FROM famous_people WHERE first_name LIKE '${args}' OR last_name LIKE '${args}';`, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    const rows = result.rows;
    console.log(`Found ${rows.length} person(s) by the name ${args}:`)
    let i = 1;
    rows.forEach(row => {
        console.log(`${i}: ${row.first_name} ${row.last_name}, born ${moment(row.birthdate).format('YYYY-MM-DD')}`)
        i++;
    })
    client.end();
  });
});