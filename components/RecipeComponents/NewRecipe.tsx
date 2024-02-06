"use client"
import React, { useState } from 'react';
import Ingredient from "@/components/UIComponents/IngredientInput";
import toast from "react-hot-toast";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {generateNewRecipe, addNewRecipeWithCategory, fetchUserTokensById, subtractTokens} from "@/utils/actions";
import {useAuth} from "@clerk/nextjs";


const NewRecipe = () => {
    const queryClient = useQueryClient();
    const {userId} = useAuth();
    const [ingredients, setIngredients] = useState(['', '', '']);
    const [isStrict, setIsStrict] = useState(false);
    const {mutate, isPending} = useMutation ({
        mutationFn: async (instructions: {ingredients: string[], isStrict:boolean})=> {

            const tokens = await fetchUserTokensById(userId!);
            if(tokens! < 500) {
                toast.error("You don't have enough tokens to generate a tour");
                return null;
            }

                const response = await generateNewRecipe({ingredients: instructions.ingredients, isStrict: instructions.isStrict});
                if(!response) {
                    toast.error("Chef couldn't generate a recipe for you. Please try again.");
                    return ;
                }

                response.recipes.map((recipe: any) => {
                    let newRecipe = addNewRecipeWithCategory(recipe);
                    if(!newRecipe) {
                        toast.error("Chef couldn't add one or more recipes to the database. Please try again.");
                        return ;
                    }
                })
            await queryClient.invalidateQueries({queryKey:["categories"]});
            const newTokens = await subtractTokens(userId!, response.tokens!);
            toast.success(`Recipes added successfully. ${newTokens} tokens remaining...`);

            return response.recipes;
        }
    })


    const addFields = () => {
        if(ingredients.length >= 10) {
            toast.error('You can only add up to 10 ingredients');
            return;
        }
        setIngredients([...ingredients, '']);
    };

    const handleIngredientChange = (index: number, value: string) => {
        const newIngredients = ingredients.map((ingredient, i) => {
            if (i === index) return value;
            return ingredient;
        });
        setIngredients(newIngredients);
    };

    const handleSubmit = (e: { preventDefault: () => void; } ) => {
        e.preventDefault();
        mutate({ingredients: ingredients, isStrict: isStrict});
        setIngredients(['', '', '']);
    }


    if(isPending) {
        return <span className='loading loading-lg'></span>
    }

    return (
        <div className="w-full max-w-xl mt-4">
            <h1 className="text-2xl font-bold">Submit Your Ingredients to Our Chef</h1>
            <form className="flex flex-col gap-3 mt-12 w-full" name="formName">
                {ingredients.map((ingredient, index) => (
                    <Ingredient
                        key={index}
                        value={ingredient}
                        onChange={(e) => handleIngredientChange(index, e.target.value)}
                    />
                ))}
                <div className="grid grid-cols-[1fr,auto] gap-2">
                    <button type="button" className="btn btn-outline" onClick={addFields}>Add Ingredient</button>
                        <label className="label cursor-pointer gap-2">
                            <span className="label-text">Remember me</span>
                            <input type="checkbox" className="checkbox" checked={isStrict} onChange={(e) => setIsStrict(!isStrict)}/>
                        </label>

                </div>
                <button type="submit" className="btn btn-primary" onClick={handleSubmit} disabled={isPending}>Ask Chef</button>
            </form>
        </div>
    );
};

export default NewRecipe;