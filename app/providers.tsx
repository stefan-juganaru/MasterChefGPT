"use client"
import React, {PropsWithChildren, useState} from 'react'
import {Toaster} from "react-hot-toast";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

const Providers = ({children}: PropsWithChildren) => {
    const [queryClient] = useState(() => {
        return new QueryClient({
            defaultOptions: {
                queries: {
                    staleTime: 1000 * 60 * 2,
                }
            }
        })
    });

    return (
        <QueryClientProvider client={queryClient}>
            <Toaster position="top-center"/>
            {children}
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    )
}
export default Providers
