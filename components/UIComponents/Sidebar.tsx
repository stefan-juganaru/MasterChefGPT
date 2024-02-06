import React from 'react'
import SidebarHeader from "@/components/UIComponents/SidebarHeader";
import NavLinks from "@/components/UIComponents/NavLinks";
import UserProfile from "@/components/UIComponents/UserProfile";

const Sidebar = () => {
    return (
        <div className="px-4 w-80 min-h-full bg-base-300 py-12 grid grid-rows-[auto,1fr,auto]">
            <SidebarHeader/>
            <NavLinks/>
            <UserProfile/>
        </div>
    )
}
export default Sidebar
