import React, { useEffect, useRef, useState } from "react"
import { clicked, GlobalObj } from "."
import { ColorInputs } from "./colorInputs"

const Find = ({ path }) => {
  const [globalObjRefactor, setGlobalObjRefactor] = useState()
  const ShapeRef = useRef()
  const buttonRef = useRef()
  const pathWithoutPublic = path.replace("public", "")

  useEffect(() => {
    if (ShapeRef.current) {
      ShapeRef.current.addEventListener("load", () => {}, false)
    }
  }, [])

  useEffect(() => {
    buttonRef.current.addEventListener("click", handleClick)
    return () => {
      buttonRef.current.removeEventListener("click", handleClick)
    }
  })

  const handleClick = () => {
    clicked(ShapeRef.current.contentDocument.children[0])
    console.log(GlobalObj());
    setGlobalObjRefactor(GlobalObj())
  }

  return (
    <div>
      <button ref={buttonRef}>Start Edit</button>
      <object
        ref={ShapeRef}
        type="image/svg+xml"
        data={pathWithoutPublic}
        width="300"
        height="300"
      ></object>
      {globalObjRefactor && (
        <ColorInputs
          SVG={ShapeRef.current.contentDocument.children[0]}
          globalInfo={globalObjRefactor}
        />
      )}
    </div>
  )
}

export default Find
