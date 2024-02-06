"use client"
import React from 'react'
import { getSingleRecipe} from "@/utils/actions";
import Image from "next/image";
import {useParams} from "next/navigation";
import {useQuery} from "@tanstack/react-query";

const SingleRecipe = () => {
    const params = useParams<{ category: string; id: string}>()
    const {data, isPending} = useQuery({
        queryKey: ["recipes", {category: params.category, id: params.id}],
        queryFn: () =>  getSingleRecipe(params.category, params.id)
    });

    if(isPending) {
        return <span className='loading loading-lg'></span>
    }

    if(!data) {
        return <h1>Something went wrong...</h1>
    }

    return (
        <div className="w-full h-auto mt-8 overflow-y-hidden ">
            <h1 className="text-4xl font-semibold mb-10">{data.recipe?.name}</h1>
            <div className="grid md:grid-cols-2 gap-10">
                <div className="grid grid-rows-2 gap-10 ">
                    <Image src={data.image} width={300} height={300} alt="recipe image" priority className="object-fit rounded-xl w-auto h-auto justify-self-center"/>
                    <ul className="grid grid-cols-3 max-h-10 max-w-2xl gap-4 text-center justify-self-center">
                        {data.recipe?.ingredients?.map((ingredient: any) => {
                            return <li key={`ingredient + ${Math.floor(Math.random() * 101)}`} className=" bg-base-300 p-4 rounded-xl">
                                <p>{ingredient.toString()}</p>
                            </li>
                        })}
                    </ul>
                </div>
                <ul>
                    {data.recipe.stepsOfPreparation.map((step: any) => {
                        return <li key={data.recipe.id} className="mb-4 bg-base-100 p-4 rounded-xl">
                            <p>{step!.toString()}</p>
                        </li>
                    })}
                </ul>
            </div>
        </div>
    )
}
export default SingleRecipe
