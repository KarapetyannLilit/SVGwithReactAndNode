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

  const changeColor = (e, colorRef) => {
    elements.map((element) => {
      if (
        window.getComputedStyle(element, null).getPropertyValue("fill") !==
        "none"
      ) {
        element.style["fill"] = e.target.value
      }
      if (
        window.getComputedStyle(element, null).getPropertyValue("stroke") !==
          "none" ||
        element.getAttribute("stroke") === null
      ) {
        element.style["stroke"] = e.target.value
      }
      if (element.tagName.includes("stop")) {
        element.setAttribute("stop-color", e.target.value)
      }
    })
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

//   const addShadow = () => {
//     for (const elem of elements) {
//       if (
//         rgb2hex(
//           window.getComputedStyle(elem, null).getPropertyValue("fill")
//         ) === name ||
//         rgb2hex(
//           window.getComputedStyle(elem, null).getPropertyValue("stroke")
//         ) === name
//       ) {
//         elem.style["boxShadow"] = "10px 10px 5px blue"
//         console.log(elem, elem.style["boxShadow"])
//         // elem.style.visibility = "hidden"
//       }
//     }
//   }
//   const removeShadow = () => {
//     for (const elem of elements) {
//       if (
//         rgb2hex(
//           window.getComputedStyle(elem, null).getPropertyValue("fill")
//         ) === name ||
//         rgb2hex(
//           window.getComputedStyle(elem, null).getPropertyValue("stroke")
//         ) === name
//       ) {
//         elem.style["boxShadow"] = ""
//         // console.log("asdfghj");
//         // elem.style.vis0ibility = "hidden"
//       }
//     }
//   }
//   const checkCheckbox = () => {
//     if (!checkboxRef.current.checked) {
//       elements.forEach((elm) => elms.splice(elms.indexOf(elm), 1))
//       checks.splice(checks.indexOf(checkboxRef.current), 1)
//       elements.map((element) => {
//         element.style.filter = ""
//         element.classList.value = element.dataset.currentStyle
//         // colorInputRef.current.value = rgb2hex(element.dataset.currentStyle)
//       })
//       elms[0].classList.value = elms[0].dataset.currentStyle
//       elms.map((element) => {
//         element.classList.value = elms[0].classList.value
//         // colorInputRef.current.value = rgb2hex(element.dataset.currentStyle)
//       })
//     } else {
//       elements.forEach((el) => {
//         elms.push(el)
//       })
//       checks.push(checkboxRef.current)
//       const val = elms[0].classList.value
//       elements.map((element) => {
//         element.style.filter = "drop-shadow(0px 2px 2px rgb(0 0 0 / 0.8))"
//         element.classList.value = val
//         // colorInputRef.current.value = rgb2hex(val)
//       })
//     }
//   }
//   useEffect(() => {
//     checkboxRef.current &&
//       checkboxRef.current.addEventListener("click", checkCheckbox)
//     return () => {
//       checkboxRef.current &&
//         checkboxRef.current.removeEventListener("click", checkCheckbox)
//     }
//   })
