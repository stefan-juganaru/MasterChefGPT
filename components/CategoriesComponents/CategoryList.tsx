import React from 'react'
import CategoryCard from "./CategoryCard";

type CategoryProps = {
    id: string;
    name: string;
}

type CategoryListProps = {
    categories: CategoryProps[]
}

const CategoryList = ({categories}: CategoryListProps) => {


    return (
        <div className="grid grid-cols-new4 gap-8 place-items-center">
            {categories.map((category: any) => {
                return <CategoryCard key={category.id} name={category.name} />
            })
            }
        </div>
    )
}
export default CategoryList
