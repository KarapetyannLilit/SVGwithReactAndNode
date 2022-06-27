export const ForCaseGradient = (gradientId, globalObj) => {
  const children = Array.from(document.getElementById(gradientId).children)
  children.forEach((child) => {
    if (gradientId in globalObj.groupGradientElements) {
      globalObj.groupGradientElements[gradientId].push(child)
    } else {
      globalObj.groupGradientElements[gradientId] = [child]
    }
  })
}
export const ForCaseXPath = (attribute, node, globalObj, findPath) => {
  if (node.getAttribute(attribute)) {
    if (node.getAttribute(attribute).includes("url")) {
      if (node.getAttribute(attribute).includes("img")) {
        return
      }
      if (node.getAttribute(attribute).includes("#")) {
        const gradientId = node
          .getAttribute(attribute)
          .substring(
            node.getAttribute(attribute).indexOf("(") + 2,
            node.getAttribute(attribute).lastIndexOf(")")
          )
        ForCaseGradient(gradientId, globalObj)
      }
    } else {
      if (node.parentNode) {
        node.dataset.path = findPath(node)
        globalObj.groupXpathElements[node.dataset.path] = [node]
      }
    }
  }
}

export const newInputs = (setfilterdFill, setfilterdStroke,setfilterdColor, globalInfo) => {
  for (const obj in globalInfo) {
    if (globalInfo[obj].stroke || globalInfo[obj].fill) {
      setfilterdStroke(Array.from(Object.keys(globalInfo[obj].stroke)))
      setfilterdFill(Array.from(Object.keys(globalInfo[obj].fill)))
    } else {
        setfilterdColor(Array.from(Object.keys(globalInfo[obj])))
    }
  }
}
