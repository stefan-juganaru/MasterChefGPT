"use server"
import OpenAI from "openai";
import prisma from "@/utils/db";
import axios from "axios";
import {revalidatePath} from "next/cache";
import {auth} from "@clerk/nextjs";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

type instructionsJson = {
    ingredients: string[],
    isStrict: boolean
}

export const generateChatMessages = async (messages: any[]) => {
    try {
        const response = await openai.chat.completions.create({
            messages: [
                {role: 'system', content: 'you are a helpful assistant'},
                ...messages
            ],
            model: 'gpt-3.5-turbo',
            temperature: 0,
        });

        return {message: response.choices[0].message, tokens: response.usage?.total_tokens}
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const getPrompt = async (instructions: instructionsJson) => {
    const query = `Based on the ingredients provided, generate a JSON object containing a list of 1 to 4 recipes. The input ingredients and the strictness flag are as follows:
    {
        "ingredients": [],
         "isStrict":boolean
    }
    
If 
    isStrict is false, additional ingredients may be included in the recipes, but all listed ingredients must be used. If 
    isStrict is true, only the listed ingredients can be used.
    
If you detect another language in the input, try to answer in the same language (all the ingredients should be in the same language in order to do this). If not possible, use English.
    
This is the object from the user. The ingredients array will contain a list of ingredients : ${JSON.stringify(instructions)}
Try to make the catergory of the recipe based on the main ingredient. If the main ingredient is not clear, use a generic category like "Uncategorized".
The expected output should strictly be a JSON object formatted as shown below, containing the names and brief descriptions of the recipes. The format must be adhered to precisely:
    {
        "recipes": [
    {
      "name": "name of the recipe",
      "categoryName": "a generic category based on the main ingredient",
      "ingredients": [
        list of ingredients (ALL INGREDIENTS USED)
      ],
      stepsOfPreparation: [
        "Step 1: ",
        "Step 2: ",
        "Step 3: "
        ...
      ]
  },
      {
      "name": "name of the recipe",
      "ingredients": [
        list of ingredients
      ],
      stepsOfPreparation: [
        "Step 1: ",
        "Step 2: ",
        "Step 3: "
        ...
      ]
    }
            // Include up to 3 recipes
        ]
      }
  message: "I successfully found 2 recipes for you"
  }
You need to be extremely strict with the format of the answer. If you don't follow the format, the test will fail.
If the user gives you a list of ingredients that you can't use to make any recipe, you need to return an empty list of recipes and a message that says "I couldn't find any recipe for you".
If the user gives you a list of ingredients that you can use to make a recipe, but you can't use all the ingredients, you need to return an empty list of recipes and a message that says "I couldn't find any recipe for you".
`;

    return query;
}

// export const generateNewRecipe = async (instructions: instructionsJson) => {
//     const query = `Based on the ingredients provided, generate a JSON object containing a list of 1 to 4 recipes. The input ingredients and the strictness flag are as follows:
//     {
//         "ingredients": [],
//          "isStrict":boolean
//     }
//
// If
//     isStrict is false, additional ingredients may be included in the recipes, but all listed ingredients must be used. If
//     isStrict is true, only the listed ingredients can be used.
//
// If you detect another language in the input, try to answer in the same language (all the ingredients should be in the same language in order to do this). If not possible, use English.
//
// This is the object from the user. The ingredients array will contain a list of ingredients : ${JSON.stringify(instructions)}
// Try to make the catergory of the recipe based on the main ingredient. If the main ingredient is not clear, use a generic category like "Uncategorized".
// The expected output should strictly be a JSON object formatted as shown below, containing the names and brief descriptions of the recipes. The format must be adhered to precisely:
//     {
//         "recipes": [
//     {
//       "name": "name of the recipe",
//       "categoryName": "a generic category based on the main ingredient",
//       "ingredients": [
//         list of ingredients (ALL INGREDIENTS USED)
//       ],
//       stepsOfPreparation: [
//         "Step 1: ",
//         "Step 2: ",
//         "Step 3: "
//         ...
//       ]
//   },
//       {
//       "name": "name of the recipe",
//       "ingredients": [
//         list of ingredients
//       ],
//       stepsOfPreparation: [
//         "Step 1: ",
//         "Step 2: ",
//         "Step 3: "
//         ...
//       ]
//     }
//             // Include up to 3 recipes
//         ]
//       }
//   message: "I successfully found 2 recipes for you"
//   }
// You need to be extremely strict with the format of the answer. If you don't follow the format, the test will fail.
// If the user gives you a list of ingredients that you can't use to make any recipe, you need to return an empty list of recipes and a message that says "I couldn't find any recipe for you".
// If the user gives you a list of ingredients that you can use to make a recipe, but you can't use all the ingredients, you need to return an empty list of recipes and a message that says "I couldn't find any recipe for you".
// `;
//
//     try {
//         const response = await openai.chat.completions.create({
//             messages: [
//                 {role: 'system', content: 'you are a cooking chef'},
//                 {role: 'user', content: query}
//             ],
//             model: 'gpt-3.5-turbo',
//             temperature: 0,
//         });
//
//         const recipeData = JSON.parse(response.choices[0].message.content!);
//         console.log(response.choices[0].message.content + "HGEFADASD")
//         if(!recipeData.recipes) {
//             return null;
//         }
//
//         return {recipes: recipeData.recipes, tokens: response.usage?.total_tokens};
//     } catch (error) {
//         console.log(error);
//         return null;
//     }
//
// };

export const getAllCategories = async (clerkId: string) => {
    return prisma.category.findMany({
        where: {
            clerkId,
        },
        orderBy: {
            name: 'asc'
        }
    });
};

export const getSingleRecipe = async (category: string, id: string) => {
    const recipe =  await prisma.recipe.findUnique({
        where: {
            id: id
        }
    });
    const image = await getImageFor(recipe!.name);

    return {
        recipe,
        image
    }
}

export const checkIfRecipeExists = async (name: string, clerkId: string) => {
    const recipe =  await prisma.recipe.findFirst({
        where: {
            name: name,
            clerkId: clerkId
        }
    });

    return recipe;
}

export const getCategoryIdFromName = async (categoryName: string) => {
    try {
        const category = await prisma.category.findFirst({
            where: {
                name: {
                    equals: categoryName.toString(),
                    mode: "insensitive"
                }
            },
        });
        return category?.id; // Assuming the field is named 'id' in your database
    } catch (error) {
        console.error(`Error fetching category ID for ${categoryName}:`, error);
        throw new Error(`Category not found for name: ${categoryName}`);
    }
};

export const getAllRecipesForCategory = async (categoryName: string, clerkId: string) => {
    try {
        const categoryId = await getCategoryIdFromName(categoryName);

        const recipes = await prisma.recipe.findMany({
            where: {
                categoryId: categoryId,
                clerkId
            },
        });
        if (recipes.length === 0) {
            console.log(`No recipes found for category: ${categoryName}`);
            return [];
        }
        return recipes;
    } catch (error) {
        console.error(`Error fetching recipes for category ${categoryName}:`, error);
        throw error;
    }
};

export const addNewRecipeWithCategory = async (recipeData: any) => {
    const {userId} = auth();
    const recipeExists = await  checkIfRecipeExists(recipeData.name, userId!)
    if(recipeExists) {
        return recipeExists;
    }
    const category = await addCategory(recipeData.categoryName, userId!);
    const newRecipe = await prisma.recipe.create({
        data: {
            ...recipeData,
            categoryId: category.id, // Link the recipe to the category
            clerkId: userId
        },
    });
    return newRecipe;
};

export const addCategory = async (categoryName: string, clerkId:string) => {
    return prisma.category.upsert({
        where: {name: categoryName},
        update: {},
        create: {name: categoryName, clerkId: clerkId},
    });
};

export const getImageFor = async (name: string) => {
    const url = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&query=`;
    const { data } = await axios(`${url}${name}`)

    return data?.results[0]?.urls.raw;
}


export const fetchUserTokensById = async (clerkId: string) => {
    const result = await prisma.token.findUnique({
        where: {
            clerkId,
        },
    });

    return result?.tokens;
};

export const generateUserTokensForId = async (clerkId: string) => {
    const result = await prisma.token.create({
        data: {
            clerkId,
        },
    });
    return result?.tokens;
};

export const fetchOrGenerateTokens = async (clerkId: string) => {
    const result = await fetchUserTokensById(clerkId);
    if (result) {
        return result;
    }
    return (await generateUserTokensForId(clerkId));
};

export const subtractTokens = async (clerkId: string, tokens: number) => {
    const result = await prisma.token.update({
        where: {
            clerkId,
        },
        data: {
            tokens: {
                decrement: tokens,
            },
        },
    });
    revalidatePath('/profile');
    // Return the new token value
    return result?.tokens;
};

export const checkTokenTimer = async (clerkId: string) => {
    const result = await prisma.token.findUnique({
        where: {
            clerkId,
        },
    });

    if (!result) {
        console.log(`Token for clerkId ${clerkId} not found.`);
        return;
    }

    const timeDiff = Date.now() - result.updatedAt.getTime();

    const twentyFourHours = 24 * 60 * 60 * 1000;

    if (timeDiff > twentyFourHours) {
        await prisma.token.update({
            where: {
                clerkId,
            },
            data: {
                tokens: 5000,
            },
        });
    }
};

