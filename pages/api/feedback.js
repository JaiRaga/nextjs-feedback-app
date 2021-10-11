import fs from 'fs'
import path from 'path'

function handler(req, res) {
	if (req.method === 'POST') {
		const email = req.body.email
		const feedback = req.body.feedback

		const data = {
			id: new Date(),
			email,
			feedback,
		}

		const filePath = path.join(process.cwd(), 'data', 'feedback.json')
		const feedbacks = fs.readFileSync(filePath)
		const feedbackArray = JSON.parse(feedbacks)
		feedbackArray.push({ ...data })
		fs.writeFileSync(filePath, JSON.stringify(feedbackArray))

		res.status(201).send({ message: 'sucesss' })
	} else {
		const filePath = path.join(process.cwd(), 'data', 'feedback.json')
		const feedbacks = fs.readFileSync(filePath)
		const data = JSON.parse(feedbacks)
		res.status(200).send(data)
	}
}

export default handler
