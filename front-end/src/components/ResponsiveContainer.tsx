import type {ReactNode } from "react";


interface ContainerProps {
    children?: ReactNode;
    className?:string
}



function ResponsiveContainer({children,className}:ContainerProps){

    return(
        <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-4 ${className}`}>
            {children}
        </div>

    );

}

export default ResponsiveContainer;