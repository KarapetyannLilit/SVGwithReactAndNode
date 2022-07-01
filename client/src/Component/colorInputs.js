import React, { useEffect, useRef, useState } from "react"
import { ColorSlider } from "./colorSlider"
import { ColorSliderForColors } from "./colorSliderForColors"
import { ColorSliderForGradientColors } from "./colorSliderForGradientColor"
import { newInputs } from "./commonFunctions"
export const ColorInputs = ({ SVG, globalInfo }) => {
  const [filterdFill, setfilterdFill] = useState([])
  const [filterdStroke, setfilterdStroke] = useState([])
  const [filterdColor, setfilterdColor] = useState([])
  const [fopenWithColor, setopenWithColor] = useState(false)
  let openWithColor

  const mergeButton = useRef()
  const elms = []
  const checks = []

  const colors = useRef()
  const gradAndColors = useRef()
  const withClass = useRef()
  const btnColors = useRef()
  const btnAll = useRef()
  const btnGradients = useRef()

  const filterdFillGradient = filterdFill.filter((className) =>
    className.includes("fill")
  )
  const filterdFillNoGradient = filterdFill.filter(
    (className) => !className.includes("fill")
  )

  const filterdStrokeGradient = filterdStroke.filter((className) =>
    className.includes("stroke")
  )
  const filterdStrokeNoGradient = filterdStroke.filter(
    (className) => !className.includes("stroke")
  )

  const gradientElements = []
  const NogradientElements = []
  filterdColor.forEach((color) => {
    gradientElements.push(
      ...globalInfo.groupedElementsByColor[color].element.filter((elem) => {
        if (elem.tagName.includes("stop")) {
          if (globalInfo.groupedElementsByColor[color].element.length !== 1) {
            if (!NogradientElements.includes(color)) {
              NogradientElements.push(color)
            }
          }
          return elem
        } else {
          if (!NogradientElements.includes(color)) {
            NogradientElements.push(color)
          }
        }
      })
    )
  })

  useEffect(() => {
    colors.current.style.display = "none"
    gradAndColors.current.style.display = "none"
    withClass.current.style.display = "none"

    btnColors.current.addEventListener("click", () => {
      newInputs(setfilterdFill, setfilterdStroke, setfilterdColor, globalInfo)
      colors.current.style.display = "block"
      gradAndColors.current.style.display = "none"
      withClass.current.style.display = "none"
    })

    btnAll.current.addEventListener("click", () => {
      newInputs(setfilterdFill, setfilterdStroke, setfilterdColor, globalInfo)
      colors.current.style.display = "none"
      gradAndColors.current.style.display = "none"
      withClass.current.style.display = "block"
    })
    btnGradients.current.addEventListener("click", () => {
      newInputs(setfilterdFill, setfilterdStroke, setfilterdColor, globalInfo)
      colors.current.style.display = "none"
      gradAndColors.current.style.display = "block"
      withClass.current.style.display = "none"
    })
  }, [])

  return (
    <div>
      <button ref={btnColors}>Colors</button>
      <button ref={btnGradients}>With Gradients</button>
      <button ref={btnAll}>ALL </button>

      <div ref={colors}>
        <div className="inputs">
          With Colors
          {filterdColor.map((color) => (
            <ColorSliderForColors
              value={color}
              elements={globalInfo.groupedElementsByColor[color].element}
              SVG={SVG}
              name={color}
              setfilterdColor={setfilterdColor}
              elms={elms}
              checks={checks}
            />
          ))}
        </div>
      </div>

      <div ref={gradAndColors}>
        <div className="inputs">
          NOT Gradient
          {NogradientElements.map((color) => (
            <ColorSliderForColors
              value={color}
              elements={globalInfo.groupedElementsByColor[color].element}
              SVG={SVG}
              name={color}
              setfilterdColor={setfilterdColor}
              elms={elms}
              checks={checks}
            />
          ))}
        </div>
        <div className="inputs">
          Gradients
          {gradientElements.map((element) => (
            <ColorSliderForGradientColors
              value={element.getAttribute("stop-color")}
              element={element}
              SVG={SVG}
            />
          ))}
        </div>
      </div>

      <div ref={withClass}>
        {filterdFillGradient.length > 0 && (
          <div className="inputs">
            Gradient Fill
            {filterdFillGradient.map((className) => (
              <ColorSlider
                value={
                  globalInfo.groupedElementsByClassName.fill[className].color
                }
                elements={
                  globalInfo.groupedElementsByClassName.fill[className].element
                }
                type={"fill"}
                SVG={SVG}
                name={className}
                mergeRef={mergeButton}
                setfilterdFill={setfilterdFill}
                setfilterdStroke={setfilterdStroke}
                setfilterdColor={setfilterdColor}
                elms={elms}
                checks={checks}
              />
            ))}
          </div>
        )}

        {filterdStrokeGradient.length > 0 && (
          <div className="inputs">
            Gradient Stroke
            {filterdStrokeGradient.map((className) => (
              <ColorSlider
                value={
                  globalInfo.groupedElementsByClassName.stroke[className].color
                }
                elements={
                  globalInfo.groupedElementsByClassName.stroke[className]
                    .element
                }
                type={"stroke"}
                SVG={SVG}
                name={className}
                mergeRef={mergeButton}
                setfilterdFill={setfilterdFill}
                setfilterdStroke={setfilterdStroke}
                setfilterdColor={setfilterdColor}
                elms={elms}
                checks={checks}
              />
            ))}
          </div>
        )}

        {filterdFillNoGradient.length > 0 && (
          <div className="inputs">
            Fill
            {filterdFillNoGradient.map((className) => (
              <ColorSlider
                value={
                  globalInfo.groupedElementsByClassName.fill[className].color
                }
                elements={
                  globalInfo.groupedElementsByClassName.fill[className].element
                }
                type={"fill"}
                SVG={SVG}
                name={className}
                mergeRef={mergeButton}
                setfilterdFill={setfilterdFill}
                setfilterdStroke={setfilterdStroke}
                setfilterdColor={setfilterdColor}
                elms={elms}
                checks={checks}
              />
            ))}
          </div>
        )}

        {filterdStrokeNoGradient.length > 0 && (
          <div className="inputs">
            Stroke
            {filterdStrokeNoGradient.map((className) => (
              <ColorSlider
                value={
                  globalInfo.groupedElementsByClassName.stroke[className].color
                }
                elements={
                  globalInfo.groupedElementsByClassName.stroke[className]
                    .element
                }
                type={"stroke"}
                SVG={SVG}
                name={className}
                mergeRef={mergeButton}
                setfilterdFill={setfilterdFill}
                setfilterdStroke={setfilterdStroke}
                setfilterdColor={setfilterdColor}
                elms={elms}
                checks={checks}
              />
            ))}
          </div>
        )}
        <div>
          <button ref={mergeButton}>Merge Colors</button>
        </div>
      </div>
    </div>
  )
}
