import React, { useRef, useEffect } from "react"
import { clicked, GlobalObj, rgb2hex } from "."
import { newInputs } from "./commonFunctions"

export const ColorSliderForColors = ({
  value,
  elements,
  type,
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
    elements.map((element) => {
      if (
        rgb2hex(
          window.getComputedStyle(element, null).getPropertyValue("fill")
        ) === inputColor ||
        element.getAttribute("fill") === inputColor
      ) {
        if (
          !element.tagName.includes("stop") &&
          window.getComputedStyle(element, null).getPropertyValue("fill") !==
            "none"
        ) {
          element.style["fill"] = e.target.value
          return
        }
      }
      if (
        rgb2hex(
          window.getComputedStyle(element, null).getPropertyValue("stroke")
        ) === inputColor ||
        element.getAttribute("stroke") === inputColor
      ) {
        if (
          !element.tagName.includes("stop") &&
          window.getComputedStyle(element, null).getPropertyValue("stroke") !==
            "none"
        ) {
          element.style["stroke"] = e.target.value
          return
        }
      }
      if (element.tagName.includes("stop")) {
        element.setAttribute("stop-color", e.target.value)
        return
      }
    })
    inputColor = e.target.value
    colorRef.current.value = e.target.value
  }

  return (
    <div className="input-checkbox">
      {/* <input ref={checkboxRef} type="checkbox" /> */}
      <input
        ref={colorInputRef}
        type="color"
        onChange={(e) => changeColor(e, colorInputRef)}
      />
    </div>
  )
}