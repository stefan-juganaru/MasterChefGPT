import SingleRecipe from "@/components/RecipeComponents/SingleRecipe";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {getSingleRecipe} from "@/utils/actions";

const Page = async ({params} : {params: {category: string, id: string}}) => {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ["recipes", {category: params.category, id: params.id}],
        queryFn: () => getSingleRecipe(params.category, params.id)
    })
    return (
    <HydrationBoundary state={dehydrate(queryClient)}>
        <SingleRecipe />
    </HydrationBoundary>
)
}
export default Page
