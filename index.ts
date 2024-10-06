import fs from "node:fs";

type Recipe = {
  name: string;
  type: "lunch" | "dinner";
};

type MealPlan = {
  [key: string]: { lunch: string; dinner: string };
};

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const getRecipe = (recipes: Recipe[]) => {
  const randomNumber = Math.floor(Math.random() * recipes.length);

  return recipes[randomNumber]?.name || `No recipe`;
};

const getUnusedRecipe = (recipes: Recipe[], usedRecipes: string[]): string => {
  let meal = getRecipe(recipes);

  while (usedRecipes.includes(meal)) {
    meal = getRecipe(recipes);
  }

  return meal;
};

const createRandomMealPlan = (recipes: Recipe[]) => {
  const lunches = recipes.filter((recipe) => recipe.type === "lunch");
  const dinners = recipes.filter((recipe) => recipe.type === "dinner");

  const newMealPlan: MealPlan = {};
  const usedRecipes: string[] = [];
  
  DAYS.forEach((day) => {
    const lunch = getUnusedRecipe(lunches, usedRecipes);
    const dinner = getUnusedRecipe(dinners, usedRecipes);

    usedRecipes.push(lunch);
    usedRecipes.push(dinner);

    newMealPlan[day] = {
      lunch,
      dinner,
    };
  });

  return newMealPlan;
};

(() => {
  const recipes = JSON.parse(fs.readFileSync("recipes.json", "utf8"));
  console.log("Here you have this week's meal plan: ", createRandomMealPlan(recipes));
})();
