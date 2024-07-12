const app = require("./app")
const PORT = 3000

const listenApp = async () => {
	const createApp = await app()

	return createApp.listen(PORT, () => {
		console.log(`Rodando na porta ${PORT}`)
	})
}

listenApp()

