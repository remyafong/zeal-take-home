import React from "react";
import { Box } from "./styles";

const Recipe = ({
    name,
    ingredients,
    instructions
}) => (
    <div>
        <h3>Recipe</h3>
        <Box>
            <h2>{name}</h2>
            <h4>Ingredients</h4>
            <div>
                {ingredients.map(ingredient =>
                    <div key={ingredient._id}>{ingredient.amount} {ingredient.unit} {ingredient.name}</div>
                )}
            </div>
            <h4>Instructions</h4>
            <div>{instructions}</div>
        </Box>
    </div>
)

export default Recipe;