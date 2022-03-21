import React from 'react'

export const Counter = () => {

    const [count,setCount] = React.useState(0)

    console.log("line no. 7")

    React.useEffect(()=> {
        console.log("Inside useEffect")
    },[count])


    console.log("Line no. 14")

    

  return (
    <div>
        <h1>Counter : {count}</h1>
        <button onClick={()=>setCount(count+1)}>ADD</button>
    </div>
  )
}
