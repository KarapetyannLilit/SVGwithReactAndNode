import { CLASSNAME, FILL, STOP_COLOR, STROKE } from "./constants"

export const rgb2hex = (rgb) => {
  rgb = rgb.match(
    /^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i
  )
  return rgb && rgb.length === 4
    ? "#" +
        ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2)
    : ""
}

const globalObj = {
  groupedElementsByClassName: {
    fill: {},
    stroke: {},
  },
  groupedElementsByColor: {},
}

const getStyleType = (node) => {
  if (node.className.animVal) {
    const className = node.className.animVal
    let { fill, stroke, strokeColor, fillColor } = filterObject(CLASSNAME, node)
    if (fill) {
      setDefaultStyle(node)
      setObj(className, fill, node, fillColor)
    }
    if (stroke) {
      setDefaultStyle(node)
      setObj(className, stroke, node, strokeColor)
    }
  }
}

const findEachChild = (node) => {
  const children = Array.from(node.children)
  if (children.length) {
    children.forEach((child) => {
      findEachChild(child)
    })
  } else {
    getStyleType(node)
  }
}

const filterObject = (type, element) => {
  let filteredType = { fill: "", stroke: "", fillColor: "", strokeColor: "" }
  switch (type) {
    case CLASSNAME: {
      const stroke = window.getComputedStyle(element).stroke
      const fill = window.getComputedStyle(element).fill
      if (
        fill &&
        fill !== "none" &&
        !element.tagName.includes("stop") &&
        !fill.includes("url")
      ) {
        filteredType.fillColor = rgb2hex(fill)
        filteredType.fill = FILL
      }
      if (
        stroke &&
        stroke !== "none" &&
        !element.tagName.includes("stop") &&
        !stroke.includes("url")
      ) {
        filteredType.strokeColor = rgb2hex(stroke)
        filteredType.stroke = STROKE
      }
      if (element.id.includes(STROKE) && element.getAttribute(STOP_COLOR)) {
        filteredType.strokeColor = element.getAttribute(STOP_COLOR)
        filteredType.stroke = STROKE
      }
      if (element.id.includes(FILL) && element.getAttribute(STOP_COLOR)) {
        filteredType.fillColor = element.getAttribute(STOP_COLOR)
        filteredType.fill = FILL
      }
      return filteredType
    }
    default: {
      return null
    }
  }
}
const setObj = (className, type, node, color) => {
  if (
    type in globalObj.groupedElementsByClassName &&
    className in globalObj.groupedElementsByClassName[type]
  ) {
    globalObj.groupedElementsByClassName[type][className]["element"].push(node)
    globalObj.groupedElementsByClassName[type][className]["color"] = [color]
  } else {
    if (
      (node.getAttribute(type) && node.getAttribute(type).includes("url(#")) ||
      node.tagName.includes("Gradient")
    ) {
      return
    }
    globalObj.groupedElementsByClassName[type][className] = { element: [node] }
    globalObj.groupedElementsByClassName[type][className]["color"] = [color]
  }
  if (color.length < 6) {
    color = color
      .split("")
      .map((item) => {
        if (item == "#") {
          return item
        }
        return item + item
      })
      .join("")
  }
  if (color in globalObj.groupedElementsByColor) {
    globalObj.groupedElementsByColor[color]["element"].push(node)
    return
  } else {
    if (
      (node.getAttribute(type) && node.getAttribute(type).includes("url(#")) ||
      node.tagName.includes("Gradient")
    ) {
      return
    } else {
      if (
        window
          .getComputedStyle(node)
          .getPropertyValue("fill")
          .includes("url") ||
        window.getComputedStyle(node).getPropertyValue("stroke").includes("url")
      ) {
        return
      }
      globalObj.groupedElementsByColor[color] = { element: [node] }
    }
  }
}
const setDefaultStyle = (node) => {
  const style = node.classList.value
  node.dataset.currentStyle = style
}

export const clicked = (node) => {
  globalObj.groupedElementsByColor = {}
  globalObj.groupedElementsByClassName.fill = {}
  globalObj.groupedElementsByClassName.stroke = {}
  findEachChild(node)
}

export const GlobalObj = () => globalObj
