import type { ReactNode } from "react";
 
interface ContainerProps{
    children?:ReactNode
    direction? : 'horizontal' | 'vertical' ;
    className?:string;
    style?:React.CSSProperties
     //the value could be vertical , horizontal or empty

}

function Container({children,className,style,direction="vertical"}:ContainerProps){
    return(
        //if direction = vertical or undefined then it will be vertical by default [flex-col]
        <div className={`w-full  px-4 sm:px-6 lg:px-8 flex  gap-4 ${direction === "horizontal"? "flex-row":"flex-col"} ${className}`} style={style}>
            {children}
        </div>
    );
}

export default Container;