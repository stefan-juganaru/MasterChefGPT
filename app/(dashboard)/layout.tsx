import React, {PropsWithChildren} from 'react'
import { FaBarsStaggered } from 'react-icons/fa6';
import SideBar from '@/components/UIComponents/Sidebar';

const DashboardLayout = ({children}: PropsWithChildren) => {
    return (
        <div className="drawer lg:drawer-open">
            <input type="checkbox" id="my-drawer-2" className="drawer-toggle"/>
            <div className="drawer-content overflow-x-hidden">
                <label htmlFor="my-drawer-2" className="drawer-button lg:hidden fixed top-6 right-6 z-10">
                    <FaBarsStaggered className="w-8 h-8 text-primary"/>
                </label>
                <div className="bg-base-200 px-8 py-12 min-h-screen">
                    {children}
                </div>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label='close sidebar' className="drawer-overlay"/>
                <SideBar/>
            </div>
        </div>
    )
}
export default DashboardLayout;
