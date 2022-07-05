import React, { useRef, useEffect } from "react"
import { clicked, GlobalObj } from "."
import { newInputs } from "./commonFunctions"

export const ColorSlider = ({
  value,
  elements,
  type,
  SVG,
  setfilterdFill,
  setfilterdStroke,
  setfilterdColor,
  name,
}) => {
  const colorInputRef = useRef()
  useEffect(() => {
    colorInputRef.current.value = value
  }, [value])

  const changeColor = (e, colorRef) => {
    elements.map((element) => {
      element.style[type] = e.target.value
      if (element.tagName.includes("stop")) {
        element.setAttribute("stop-color", e.target.value)
      }
    })
    colorRef.current.value = e.target.value
  }

  const showinput = (e) => {
    const target = e.target
    if (target) {
      const children = Array.from(elements)
      for (const elem of children) {
        if (elem.classList.value === target.classList.value) {
          console.log(colorInputRef.current)
          colorInputRef.current.style.filter =
            "drop-shadow(16px 16px 10px black)"
          return
        }
      }
      colorInputRef.current.style.filter = ""
    }
  }

  useEffect(() => {
    SVG && SVG.addEventListener("click", showinput)
    return () => {
      SVG && SVG.removeEventListener("click", showinput)
    }
  })

  const addShadow = () => {
    const children = Array.from(SVG.children)
    for (const elem of children) {
      if (elem.classList.value !== name) {
        elem.style.filter = "drop-shadow(0px 2px 2px rgb(0 0 0 / 0.8))"
      }
    }
  }
  const removeShadow = () => {
    const children = Array.from(SVG.children)
    for (const elem of children) {
      if (elem.classList.value !== name) {
        elem.style.filter = ""
      }
    }
  }
  return (
    <div className="input-checkbox">
      <input
        ref={colorInputRef}
        type="color"
        onChange={(e) => changeColor(e, colorInputRef)}
        onMouseEnter={addShadow}
        onMouseLeave={removeShadow}
      />
    </div>
  )
}
