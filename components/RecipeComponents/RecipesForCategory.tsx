"use client"
import React from 'react'
import RecipeCard from "@/components/RecipeComponents/RecipeCard";
import {useQuery} from "@tanstack/react-query";
import {getAllRecipesForCategory} from "@/utils/actions";
import {useParams} from "next/navigation";
import {useAuth} from "@clerk/nextjs";

const RecipesForCategory =  () => {
    const {userId} = useAuth();
    const params = useParams<{ category: string;}>()
    const {data, isPending} = useQuery({
        queryKey: ["recipes", {categoryName: params.category}],
        queryFn:  () =>  getAllRecipesForCategory(params.category, userId!)
    });


    if(isPending) {
        return <span className="loading"></span>
    }


    return (
        <>

            <h1 className="w-full text-4xl my-12 capitalize text-center ">the list of recipes for {params.category}</h1>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {
                    data.map((recipe: any) => {
                        return <RecipeCard key={recipe.id} name={recipe.name} categoryName={recipe.categoryName} id={recipe.id} ingredients={recipe.ingredients} stepsOfPreparation={recipe.stepsOfPreparation}/>
                    })
                }
            </div>
        </>
    )
}
export default RecipesForCategory
