import React, { useEffect, useRef, useState } from "react"
import { ColorSlider } from "./colorSlider"
import { ColorSliderForColors } from "./colorSliderForColors"
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

  const el1 = useRef()
  const el2 = useRef()
  const btnColors = useRef()
  const btnAll = useRef()

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

  useEffect(() => {
    el1.current.style.display = "none"
    el2.current.style.display = "none"
    btnColors.current.addEventListener("click", () => {
      newInputs(setfilterdFill, setfilterdStroke, setfilterdColor, globalInfo)
      el1.current.style.display = "block"
      el2.current.style.display = "none"
    })

    btnAll.current.addEventListener("click", () => {
      newInputs(setfilterdFill, setfilterdStroke, setfilterdColor, globalInfo)
      el1.current.style.display = "none"
      el2.current.style.display = "block"
    })
  }, [])


  return (
    <div>
      <button ref={btnColors}>Colors</button>
      <button ref={btnAll}>ALL </button>

      <div ref={el1}>
        <div className="inputs">
          With Colors
          {filterdColor.map((color) => (
            <ColorSliderForColors
              value={color}
              elements={globalInfo.groupedElementsByColor[color].element}
              type={globalInfo.groupedElementsByColor[color].type}
              SVG={SVG}
              name={color}
              setfilterdColor={setfilterdColor}
              elms={elms}
              checks={checks}
            />
          ))}
        </div>
      </div>

      <div ref={el2}>
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
