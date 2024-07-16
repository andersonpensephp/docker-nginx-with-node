const express = require('express')
const dotenv = require('dotenv')
const mysql = require('mysql')
const { faker } = require('@faker-js/faker')

dotenv.config()

const app = async () => {
	const app = express()
	const config = {
		host: process.env.MYSQL_HOST || 'database',
		user: process.env.MYSQL_USER || 'root',
		password: process.env.MYSQL_PASSWORD,
		database: process.env.MYSQL_DATABASE || 'nodedb'
	}
	
	app.get('/', async (req, res) => {
		const connection = await mysql.createConnection(config)
		
		const randomName = faker.person.fullName()

		const sql = `INSERT INTO people(name) value('${randomName}')`
    const getPeopleSQL = `SELECT * FROM people`
		
		connection.query(sql)

		connection.query(getPeopleSQL, async (err, result, fields) => {
				
				const html = `
					<h1>Full Cycle Rocks!</h1>
					<br>
					<ul>
						${result.map(resultObj => {
							return `<li>id: ${resultObj.id} - name: ${resultObj.name}</li>`
						})}
					</ul>
				`
				res.send(html)
		})
	
		connection.end()
	})

	return app
}

module.exports = app