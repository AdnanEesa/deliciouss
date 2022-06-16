import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

function Searched() {
  const [searched, setSearched] = useState([]);
  let params = useParams();

  const getSearched = async (name) => {
    const check = localStorage.getItem(name);
    if (check) {
      setSearched(JSON.parse(check));
    } else {
      const data = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=6af2d1ce31264633b30733187d634de0&query=${name}&includeIngredients=halal&excludeIngredients=pork,alcohol,nutmeg,beer,escargot,snail,gelatine,lard,pepsin`
      );
      const recipes = await data.json();
      localStorage.setItem(name, JSON.stringify(recipes.results));
      setSearched(recipes.results);
      console.log(recipes.results);
    }
  };

  useEffect(() => {
    getSearched(params.search);
  }, [params.search]);

  return (
    <Grid>
      {searched.map((item) => (
        <Card key={item.id}>
          <Link to={"/recipe/" + item.id}>
            <img src={item.image} alt={item.title} />
            <h4>{item.title}</h4>
          </Link>
        </Card>
      ))}
    </Grid>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
`;

const Card = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;
  }
  a {
    text-decoration: none;
  }
  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

export default Searched;
