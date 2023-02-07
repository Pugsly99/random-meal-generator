import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

function App() {
	const [recipe, setRecipe] = useState(null);

	const generateRecipe = () => {
		axios
			.get('https://www.themealdb.com/api/json/v1/1/random.php')
			.then(function (response) {
				console.log(response.data.meals);
				setRecipe(response.data.meals);
			})
			.catch(function (error) {
				console.log(error);
			})
			.finally(function () {
				console.log('recipe', recipe);
			});
	};

	return (
		<div className='App'>
			<div className='Header'>
				<button onClick={generateRecipe}> Generate Recipe </button>
			</div>
			<div className='Body'></div>
		</div>
	);
}

export default App;
