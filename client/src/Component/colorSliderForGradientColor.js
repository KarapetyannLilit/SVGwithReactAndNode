import React, { useRef, useEffect } from "react"
import { clicked, GlobalObj, rgb2hex } from "."
import { newInputs } from "./commonFunctions"

export const ColorSliderForGradientColors = ({ value, element, SVG }) => {
  const colorInputRef = useRef()
  const checkboxRef = useRef()
  const globalInfo = GlobalObj()
  if (value.length < 6) {
    value = value
      .split("")
      .map((item) => {
        if (item == "#") {
          return item
        }
        return item + item
      })
      .join("")
  }
  useEffect(() => {
    colorInputRef.current.value = value
  }, [value])

  let inputColor
  if (colorInputRef.current) {
    inputColor = colorInputRef.current.value
  }

  const changeColor = (e, colorRef) => {
    const newColor = e.target.value
    if (element.tagName.includes("stop")) {
      element.setAttribute("stop-color", newColor)
      return
    }
    inputColor = newColor
    colorRef.current.value = newColor
  }

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
