import { useEffect, useState } from "react";
import Recipes from "./Recipes";
import React from "react";
import './App.css'

function App() {
  const APP_ID = "c0235d3e";
  const APP_KEY = "12b2deb70f5e66423732dddd014488af";

  // const exampleReq = `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [result, setResult] = useState('chicken');
  



  useEffect(() => {
    getRecipe();
  },[result]);




 const getRecipe = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${result} &app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
    console.log(search)
  };

  const getSearch = e =>{
    e.preventDefault();
    setResult(search);
    setSearch('');
  }




  return (
    <div className="App">
      <form  onSubmit={getSearch} className="search-form">
        <input
          className="search-bar"
          value={search}
          onChange={updateSearch}
          type="text"
        />
        {/* <button   className="search-button" >
          search
        </button> */}
        <input type="submit" className="search-button" value="search" />
      </form>
        <div className="recipes">
          {recipes.map((recipes) => (
            <Recipes
              key={recipes.recipe.image}
              title={recipes.recipe.label}
              calories={recipes.recipe.calories}
              image={recipes.recipe.image}
              ingredients={recipes.recipe.ingredients}
            />
          ))}
        </div>
    </div>
  );
}

export default App;

