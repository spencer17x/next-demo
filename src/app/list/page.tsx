'use client';

import React, { memo, useEffect, useState } from "react";

const data = Array(10).fill(0).map((_, index) => index)

const Child: React.FC<{
  data: Array<[]>
  count: number
}> = memo(({
  data,
  count
}) => {
  console.log('render')
  return <div>
    <div>child</div>
    <div>count: {count}</div>
    <div>
      {JSON.stringify(data)}
    </div>
  </div>
}, (prevProps, nextProps) => {
  console.log('compare', prevProps.data === nextProps.data)
  return prevProps.data === nextProps.data && prevProps.count === nextProps.count
})

Child.displayName = 'Child'

const App = () => {
  const [childData, setChildData] = useState([])
  const [count, setCount] = useState(0)

  useEffect(() => {
    setInterval(() => {
      // setChildData([])
      setCount(count => count + 1)
    }, 1000)
  }, [])

  return <div>
    <div id="testDom">test</div>
    {
      data.map(item => {
        return <div className="bg-green-50" key={item} onDoubleClick={() => console.log(item)}>
          {item}
        </div>
      })
    }
    <Child data={childData} count={count}/>
  </div>
};

export default App;