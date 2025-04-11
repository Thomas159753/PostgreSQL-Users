#! /usr/bin/env node

const { Client } = require("pg");
require('dotenv').config();

const SQL = `
CREATE TABLE IF NOT EXISTS usernames (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    USERNAME VARCHAR (225)
);

INSERT INTO usernames (username)
VALUES
    ('Bryan'),
    ('Odin'),
    ('Thor');
`
async function main(){
    console.log('Populating database...');
    const client = new Client({
        connectionString: process.env.DB_CONNNECTION_STRING,
    })
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log('Database populated!');
}

main();