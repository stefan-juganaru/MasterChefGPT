import React, {PropsWithChildren} from 'react'
import BackButton from "@/components/UIComponents/BackButton";

const CategoryLayour = ({children}: PropsWithChildren) => {
    return (
        <>
            <BackButton/>
            {children}
        </>
    )
}
export default CategoryLayour
