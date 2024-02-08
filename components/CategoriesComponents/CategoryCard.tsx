"use client"
import Link from 'next/link'
import Image from "next/image"
import {useEffect, useState} from "react";
import axios from "axios";

type Props = {
    name: string;
}

const url = `https://api.unsplash.com/search/photos?client_id=n3gLRWDB9QoD-U_XlRBchxEEsPlvlDKuh5XIImFJ2yY&query=`;
const CategoryCard =  ({name}: Props) => {
    const [image, setImage] = useState<string >("");
    const endpoint = name.toLowerCase().replace(' ', '-');

    useEffect(() => {
        const fetchImage = async () => {
            try {
                let imageName = name;
                if(name === "Uncategorized") {
                    imageName = "Generic food"
                }
                const { data } = await axios(`${url}${imageName + "dish"}`);
                setImage(data?.results[0]?.urls.raw);
            } catch (error) {
                console.error('Failed to fetch image:', error);
            }
        };
        fetchImage();
    }, [name])

    return (
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
            <figure><Image src={image} width={300} height={300} alt="Food Image" className="h-96 w-full object-cover" priority/></figure>
            <div className="card-body flex justify-center place-items-center">
                <h2 className="card-title">{name + " recipes"}</h2>
                <div className="card-actions ">
                    <Link href={`/recipes/${endpoint}`} className="btn btn-primary mb-4 uppercase">check the recipes</Link>
                </div>
            </div>
        </div>
    )
}
export default CategoryCard
