import './App.css';
import React, { useState } from 'react';
import axios from 'axios';
import Iframe from 'react-iframe';

function App() {
	const [recipe, setRecipe] = useState();

	const generateRecipe = () => {
		axios
			.get('https://www.themealdb.com/api/json/v1/1/random.php')
			.then(function (response) {
				console.log(response.data.meals[0]);
				setRecipe(response.data.meals[0]);
			})
			.catch(function (error) {
				console.log(error);
			});

		console.log(recipe);
	};

	return (
		<div className='App'>
			<div className='Header'>
				<button onClick={generateRecipe}> Generate Recipe </button>
			</div>
			{recipe ? (
				<div className='Body'>
					<img
						src={recipe.strMealThumb}
						alt='Recipe Image'
						className='recipeImage'
					/>
					<div className='tags'>//Category //Area //Tags</div>
					<h1 className='title'></h1>
					<div className='about'></div>
					<div className='ingredients'></div>
					<Iframe
						url={recipe.strYoutube}
						width='640px'
						height='320px'
					/>
				</div>
			) : (
				<> Lets Get You Somthing To Cook </>
			)}
		</div>
	);
}

export default App;
