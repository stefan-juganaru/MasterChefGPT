import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import React from 'react'
import AllCategories from "@/components/CategoriesComponents/AllCategories";

const Page = () => {
    const queryClient = new QueryClient();
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <AllCategories />
        </HydrationBoundary>
    )
}
export default Page
