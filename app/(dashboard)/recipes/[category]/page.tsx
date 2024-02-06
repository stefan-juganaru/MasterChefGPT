import React from 'react'
import RecipesForCategory from "@/components/RecipeComponents/RecipesForCategory";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {getAllRecipesForCategory} from "@/utils/actions";
import {auth} from "@clerk/nextjs";

const CategoryPage = async ({params}: {params: {category:string}}) => {
    const {userId} = auth();
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ['recipes', {category: params.category}],
        queryFn: () => getAllRecipesForCategory(params.category, userId!)
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <RecipesForCategory />
        </HydrationBoundary>
    )
}
export default CategoryPage

