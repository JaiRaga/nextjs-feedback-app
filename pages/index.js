import { useRef, useState } from 'react'

export default function Home() {
	const emailInputRef = useRef()
	const feedbackInputRef = useRef()
	const [feedbacks, setFeedbacks] = useState([])

	const submitFormHandler = (event) => {
		event.preventDefault()
		const enteredEmail = emailInputRef.current.value
		const enteredFeedback = feedbackInputRef.current.value

		const data = {
			email: enteredEmail,
			feedback: enteredFeedback,
		}

		fetch('/api/feedback', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((response) => response.json())
			.then((data) => console.log(data))
	}

	const showFeedbackHandler = () => {
		fetch('/api/feedback')
			.then((res) => res.json())
			.then((data) => setFeedbacks(data))
	}

	return (
		<div>
			<h1>Home page</h1>
			<form onSubmit={submitFormHandler}>
				<div>
					<label htmlFor='input'>Your Email Address</label>
					<input type='input' id='input' ref={emailInputRef} />
				</div>
				<div>
					<label htmlFor='feedback'>Your Feedback</label>
					<input
						type='feedback'
						id='feedback'
						rows='5'
						ref={feedbackInputRef}
					/>
				</div>
				<button>Send Feedback</button>
			</form>
			<button onClick={showFeedbackHandler}>Show Feedbacks</button>
			<ul>
				{feedbacks.map((feedback) => (
					<li key={feedback.id}>{feedback.feedback}</li>
				))}
			</ul>
		</div>
	)
}
