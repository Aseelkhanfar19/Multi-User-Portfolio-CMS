import type {ReactNode } from "react";



interface compProps{
    children:ReactNode
};


function IntroBox({children}:compProps){
    return (
    <>
        <div className="fixed top-0 left-0 w-full bg-blue-700 py-6">
        {children}
        </div>
    </>)

}

export default IntroBox;