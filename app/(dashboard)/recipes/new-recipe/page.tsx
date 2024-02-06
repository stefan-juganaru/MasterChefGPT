import React from 'react'
import NewRecipe from "@/components/RecipeComponents/NewRecipe";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";

const Page = () => {
    const queryClient = new QueryClient();
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NewRecipe/>
        </HydrationBoundary>
    )
}
export default Page
