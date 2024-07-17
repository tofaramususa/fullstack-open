import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

const Button = ({onClick, text }) => 
	{
		return(
			<div>
				<button onClick={onClick}>
					{text}
				</button>
			</div>
		)
	}

const StatisticLine = ({text, value}) =>
{
	return (
		<tr>
			<td>{text} </td>
			<td>{value}</td>
		</tr>
	)
}
const Statistics = ({bad, good, neutral}) => {

	const average = () =>
		{
			return ( (bad + neutral + good) / 3 )
		}
	const positive = () =>
		{
			if(!good && !bad && !neutral)
				return 0
			return((good / (good + bad + neutral)) * 100)
		}

	if(!good && !bad && !neutral)
		{
			return(<p>"No feedback given"</p>)
		}
	return (
		<table>
			<tbody>
				<StatisticLine text="good" value={good}/>
				<StatisticLine text="neutral" value={neutral}/>
				<StatisticLine text="bad" value={bad}/>
				<StatisticLine text="average" value={average()}/>
				<StatisticLine text="positive" value={positive()}/>
			</tbody>
		</table>
	)
}

const App = () => {

		const anecdotes = [
		  'If it hurts, do it more often.',
		  'Adding manpower to a late software project makes it later!',
		  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
		  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
		  'Premature optimization is the root of all evil.',
		  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
		  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
		  'The only way to go fast, is to go well.'
		]
	
	const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
	const [selected, setSelected] = useState(0)	  
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)
	
	const addVotes = (value) => {
		const copy = [...votes]
		copy[value] += 1 
		setVotes(copy)
	}
	const maxVotes = Math.max(...votes)
	const maxVotesIndex = votes.indexOf(maxVotes)
		return(
			<div>
			<h1>give feedback</h1>
			<Button onClick={() => {setGood(good + 1)}} text="good" />
			<Button onClick={() => {setNeutral(neutral + 1)}} text="Neutral" />
			<Button onClick={() => {setBad(bad + 1)}} text="Bad" />
			<h1>statistics</h1>
			<Statistics good={good} bad={bad} neutral={neutral} />
			<h1>Anecdote of the day</h1>
			{anecdotes[selected]}
			<p>has {votes[selected]} votes</p>
			<Button onClick={() => {(setSelected(Math.floor(Math.random() * anecdotes.length)))}} text="next anecdote"/>
			<Button onClick={() => {addVotes(selected)}} text="vote"/>
			<h1>Anecdote with most values</h1>
			{anecdotes[maxVotesIndex]}
			<p>has {maxVotes}</p>
		</div>
	)
}

export default App