import type {ReactNode } from "react";


interface content {
    element: ReactNode
}



function Container({element}:content){

    return(
        <div className="">
            {element}
        </div>

    );

}

export default Container;