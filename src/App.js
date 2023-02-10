import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Iframe from 'react-iframe';

function App() {
	const [recipe, setRecipe] = useState();
	const [ingredients, setIngredients] = useState();

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

	const listIngredients = () => {
		setIngredients([]);
		//Only Ever 20
		for (let i = 1; i <= 20; i++) {
			if (recipe[`strIngredient${i}`]) {
				setIngredients((prevIngredients) => [
					...prevIngredients,
					`${recipe[`strIngredient${i}`]} - ${
						recipe[`strMeasure${i}`]
					}`,
				]);
			} else {
				console.log(ingredients);
				break;
			}
		}
	};

	useEffect(() => {
		if (recipe) {
			listIngredients();
		}
	}, [recipe]);

	return (
		<div className='App'>
			<div className='Header'>
				<h1>Get Your Meal Here</h1>
				<button onClick={generateRecipe}> Generate Recipe </button>
			</div>
			{ingredients ? (
				<div className='Body'>
					<div className='Top'>
						<img
							src={recipe.strMealThumb}
							alt='Recipe Image'
							className='recipeImage'
						/>
						<div className='tags'>//Category //Area //Tags</div>
					</div>
					<h1 className='title'>{recipe.strMeal}</h1>
					<div className='Middle'>
						<h2>Instructions</h2>
						<div className='about'>{recipe.strInstructions}</div>
						<h2>Ingredients</h2>
						<ul className='ingredients'>
							{ingredients.map((ingredient) => (
								<li>{ingredient}</li>
							))}
						</ul>
					</div>
					<Iframe
						url={`https://www.youtube.com/embed/${recipe.strYoutube.slice(
							-11
						)}`}
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
