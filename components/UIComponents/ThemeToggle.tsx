"use client"
import React, {useState} from 'react'
import {BsMoonFill, BsSunFill} from "react-icons/bs";

const themes = {
    autumn: 'autumn',
    luxury: 'luxury'
}

const ThemeToggle = () => {
    const [theme, setTheme] = useState<string>(themes.luxury);

    const toggleThemeHandler = () => {
        const newTheme = theme === themes.luxury ? themes.autumn : themes.luxury;
        document.documentElement.setAttribute('data-theme', newTheme);
        setTheme(newTheme);
    }

    return (
        <button onClick={toggleThemeHandler} className="btn btn-sm bg-base-300 btn-outline">
            {theme === themes.luxury ? <BsSunFill className="w-4 h-4"/> : <BsMoonFill className="w-4 h-4"/>}
        </button>
    )
}
export default ThemeToggle
