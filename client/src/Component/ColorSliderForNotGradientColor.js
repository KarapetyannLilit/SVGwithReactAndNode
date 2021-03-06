import React, { useRef, useEffect } from "react"
import { clicked, GlobalObj, rgb2hex } from "."
import { newInputs } from "./commonFunctions"

export const ColorSliderForNotGradientColors = ({
  value,
  elements,
  SVG,
  setfilterdColor,
  checks,
  elms,
  name,
}) => {
  const colorInputRef = useRef()
  const checkboxRef = useRef()
  const globalInfo = GlobalObj()
  useEffect(() => {
    colorInputRef.current.value = value
  }, [value])

  let inputColor
  if (colorInputRef.current) {
    inputColor = colorInputRef.current.value
  }

  const changeColor = (e, colorRef) => {
    const newColor = e.target.value

    const changeElementPropColor = (prop) => (element) => {
      const computedStyle = window.getComputedStyle(element, null)
      const fillOrStroke = computedStyle.getPropertyValue(prop)

      if (
        fillOrStroke !== "none" &&
        (rgb2hex(fillOrStroke) === inputColor ||
          element.getAttribute(prop) === inputColor)
      ) {
        element.style[prop] = newColor
        return
      }
    }

    elements.forEach((element) => {
      changeElementPropColor("fill")(element)
      changeElementPropColor("stroke")(element)
    })
    inputColor = newColor
    colorRef.current.value = newColor
  }
  const showinput = (e) => {
    const target = e.target
    if (target) {
      const children = Array.from(elements)
      for (const elem of children) {
        if (elem.classList.value === target.classList.value) {
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

  return (
    <div className="input-checkbox">
      <input
        ref={colorInputRef}
        type="color"
        onChange={(e) => changeColor(e, colorInputRef)}
      />
    </div>
  )
}
