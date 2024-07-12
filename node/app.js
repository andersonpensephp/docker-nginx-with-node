const express = require('express')
const dotenv = require('dotenv')
const mysql = require('mysql2')

dotenv.config()

const app = async () => {
	const app = express()
	const config = {
		host: process.env.MYSQL_HOST || 'database',
		user: process.env.MYSQL_USER || 'root',
		password: process.env.MYSQL_PASSWORD,
		database: process.env.MYSQL_DATABASE || 'nodedb'
	}

	const connection = mysql.createConnection(config)

	const sql = `INSERT INTO people(name) value('Anderson')`
	connection.query(sql)
	connection.end()

	app.get('/', async (req, res) => {
	const connection = mysql.createConnection(config)

    const getPeopleSQL = `SELECT * FROM people`

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