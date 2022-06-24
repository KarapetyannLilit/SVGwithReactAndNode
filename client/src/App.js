import React, { useEffect, useState } from "react"
import Find from "./Component/find"

const App = () => {
  const [path, setPath] = useState()
  const getSVG = async () => {
    const response = await fetch("http://localhost:3003/svg")
      .then((response) => response.text())
      .then((data) => setPath(data))
  }
  useEffect(() => {
    getSVG()
  }, [])

  return <div>{path && <Find path={path} />}</div>
}

export default App
