"use client"

import React from 'react'
import CategoryList from "@/components/CategoriesComponents/CategoryList";
import {useQuery} from "@tanstack/react-query";
import {getAllCategories} from "@/utils/actions";
import {useAuth} from "@clerk/nextjs";

const AllCategories = () => {
    const {userId} = useAuth();
    const {data, isPending} = useQuery({
        queryKey: ["categories"],
        queryFn: () => getAllCategories(userId!)
    });


    return (
        <>
            <h1 className="w-full text-4xl my-12 capitalize text-center ">your collection of recipes</h1>
            {isPending ? <span className="loading loading-lg text-center"></span> : <CategoryList categories={data!}/>}
        </>
    )
}
export default AllCategories
