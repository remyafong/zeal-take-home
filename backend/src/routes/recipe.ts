import { Request, Response } from "express"
import { RecipeModel } from "../models";

interface Query {
  _id?: string
}

export const recipeMiddleware = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const recipe = await RecipeModel.findById(id)
    res.send(recipe)
  } catch (error) {
    res.status(404).send('Recipe not found')
  }
}
