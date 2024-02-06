"use client"
import ThemeToggle from "@/components/UIComponents/ThemeToggle";
import logo from "@/assets/logo.svg"
import Image from "next/image";

const SidebarHeader = () => {

    return (
        <div className="flex items-center mb-4 gap-4 px-4">
            <Image src={logo} alt="logo" width={100} height={100} className="mr-auto"/>
            <ThemeToggle/>
        </div>
    )
}
export default SidebarHeader
