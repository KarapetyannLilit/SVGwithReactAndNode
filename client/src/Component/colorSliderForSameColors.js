import React, { useRef, useEffect } from "react"
import { clicked, GlobalObj, rgb2hex } from "."
import { newInputs } from "./commonFunctions"

export const ColorSliderForSameColors = ({
  value,
  element,
  elements,
  SVG,
  setfilterdColor,
  checkboxColorRef,
  filterdColor,
}) => {
  const colorInputRef = useRef()
  const checkboxRef = useRef()
  const globalInfo = GlobalObj()
  useEffect(() => {
    colorInputRef.current.value = value
  }, [value])

  let inputColor
  if (colorInputRef.current) {
    inputColor = value
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

    const hasStop = element.tagName.includes("stop")
    if (hasStop) {
      element.setAttribute("stop-color", newColor)
      return
    }

    changeElementPropColor("fill")(element)
    changeElementPropColor("stroke")(element)
    inputColor = newColor
    colorRef.current.value = newColor
  }

  const addNewInput = (inputref, element) => {
    if (colorInputRef.current.value !== value) {
      filterdColor.push(colorInputRef.current.value)
      const fnewfilterdColor = Array.from(new Set(filterdColor))
      // globalInfo.groupedElementsByColor[colorInputRef.current.value] = {
      //   element: [element],
      // }
      clicked(SVG)
      setfilterdColor(fnewfilterdColor)
    }
    if (globalInfo.groupedElementsByColor[value].element.length === 1) {
      checkboxColorRef.current.style.display = "none"
    }
  }

  useEffect(() => {
    checkboxColorRef.current.addEventListener("change", function () {
      if (this.checked) {
        return
      } else {
        if (colorInputRef.current && element) {
          const inputref = colorInputRef.current
          addNewInput(inputref, element)
        }
      }
    })
  }, [])

  const showinput = (e) => {
    const target = e.target
    if (target) {
      if (element.classList.value === target.classList.value) {
        colorInputRef.current.style.filter = "drop-shadow(16px 16px 10px black)"
        return
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
