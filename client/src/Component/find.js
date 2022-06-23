import React, { useEffect, useRef, useState } from "react"
import { clicked, GlobalObj } from "."
import { ColorInputs } from "./colorInputs"

const Find = () => {
    const [globalObjRefactor, setGlobalObjRefactor] = useState()
    const ShapeRef = useRef()

    useEffect(() => {
        console.log('useefffeef')
        if (ShapeRef.current) {
            ShapeRef.current.addEventListener("load", () => {
                console.log(ShapeRef.current.contentDocument)
            }, false);
        }
    }, [])

    const handleClick = () => {
        clicked(ShapeRef)
        setGlobalObjRefactor(GlobalObj())
    }

    return (
        <div>
            <object ref={ShapeRef} type='image/svg+xml' data="http://devserver.am:3000/static/media/logo.6ce24c58023cc2f8fd88fe9d219db6c6.svg" width="300" height="300"></object>
            {globalObjRefactor && (
                <ColorInputs ShapeRef={ShapeRef} globalInfo={globalObjRefactor} />
            )}
        </div>
    )
}

export default Find