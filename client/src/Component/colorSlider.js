import React, { useRef, useEffect } from "react"
import { clicked, GlobalObj } from "."
import { newInputs } from "./commonFunctions"

export const ColorSlider = ({
    value,
    elements,
    type,
    mergeRef,
    SVG,
    setfilterdFill,
    setfilterdStroke,
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
            element.style[type] = e.target.value
            if (element.tagName.includes("stop")) {
                element.setAttribute("stop-color", e.target.value)
            }
        })
        colorRef.current.value = e.target.value
    }

    const checkCheckbox = () => {
        if (!checkboxRef.current.checked) {
            elements.forEach((elm) => elms.splice(elms.indexOf(elm), 1))
            checks.splice(checks.indexOf(checkboxRef.current), 1)
            elements.map((element) => {
                element.style.filter = ""
                element.classList.value = element.dataset.currentStyle
                // colorInputRef.current.value = rgb2hex(element.dataset.currentStyle)
            })
            elms[0].classList.value = elms[0].dataset.currentStyle
            elms.map((element) => {
                element.classList.value = elms[0].classList.value
                // colorInputRef.current.value = rgb2hex(element.dataset.currentStyle)
            })
        } else {
            elements.forEach((el) => {
                elms.push(el)
            })
            checks.push(checkboxRef.current)
            const val = elms[0].classList.value
            elements.map((element) => {
                element.style.filter = "drop-shadow(0px 2px 2px rgb(0 0 0 / 0.8))"
                element.classList.value = val
                // colorInputRef.current.value = rgb2hex(val)
            })
        }
    }
    useEffect(() => {
        checkboxRef.current &&
            checkboxRef.current.addEventListener("click", checkCheckbox)
        return () => {
            checkboxRef.current &&
                checkboxRef.current.removeEventListener("click", checkCheckbox)
        }
    })
    const merge = () => {
        elms.map((el) => {
            el.style.filter = ""
        })
        checks.forEach((check) => {
            check.checked = !check.checked
        })
        //  newSVG = ShapeRef.current.innerHTML
        //  ShapeRef.current = `<svg ref = ${ShapeRef}> ${newSVG} </svg>`
        //  // ShapeRef.current.appendChild(newSVG);
        clicked(SVG)
        newInputs(setfilterdFill, setfilterdStroke, globalInfo)
        elms = []
    }

    useEffect(() => {
        mergeRef && mergeRef.current.addEventListener("click", merge)
        return () => {
            mergeRef && mergeRef.current.removeEventListener("click", merge)
        }
    })
    const addShadow = () => {
        const children = Array.from(SVG.children)
        for (const elem of children) {
            if (elem.classList.value !== name) {
                elem.style.visibility = "hidden"
            }
        }
    }
    const removeShadow = () => {
        const children = Array.from(SVG.children)
        for (const elem of children) {
            if (elem.classList.value !== name) {
                elem.style.visibility = "visible"
            }
        }
    }
    return (
        <div className="input-checkbox">
            <input ref={checkboxRef} type="checkbox" />
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