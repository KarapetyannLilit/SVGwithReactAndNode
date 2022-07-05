import React, { useRef, useEffect, useState } from "react"
import { clicked, GlobalObj, rgb2hex } from "."
import { ColorSliderForSameColors } from "./colorSliderForSameColors"
import { newInputs } from "./commonFunctions"

export const ColorSliderForColors = ({
  value,
  elements,
  SVG,
  setfilterdColor,
  filterdColor,
}) => {
  const colorInputRef = useRef()
  const btnShowAllColors = useRef()
  const allInputsWithSameColor = useRef()
  const [newColor, setnewColor] = useState(value)

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
      const hasStop = element.tagName.includes("stop")
      if (hasStop) {
        element.setAttribute("stop-color", newColor)
        return
      }
      changeElementPropColor("fill")(element)
      changeElementPropColor("stroke")(element)
    })

    colorRef.current.value = newColor
    setnewColor(newColor)
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

  useEffect(() => {
    allInputsWithSameColor.current.style.display = "none"
    if (elements.length > 5 || elements.length === 1) {
      btnShowAllColors.current.style.display = "none"
    }
    btnShowAllColors.current.addEventListener("change", function () {
      if (this.checked) {
        allInputsWithSameColor.current.style.display = "block"
        colorInputRef.current.style.display = "none"
      } else {
        allInputsWithSameColor.current.style.display = "none"
        colorInputRef.current.style.display = "block"
      }
    })
  }, [])

  return (
    <div className="input-checkbox">
      <input
        ref={colorInputRef}
        type="color"
        onChange={(e) => changeColor(e, colorInputRef)}
      />
      <input ref={btnShowAllColors} type={"checkbox"}></input>
      <div ref={allInputsWithSameColor}>
        {elements.map((elem, item) => (
          <ColorSliderForSameColors
            key={item}
            value={newColor}
            element={elem}
            elements={elements}
            SVG={SVG}
            name={value}
            setfilterdColor={setfilterdColor}
            checkboxColorRef={btnShowAllColors}
            filterdColor={filterdColor}
          />
        ))}
      </div>
    </div>
  )
}
