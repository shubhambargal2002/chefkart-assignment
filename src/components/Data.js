import React, { useState } from 'react'
import IndividualData from './IndividualData'

const Data = ({excelData}) => {
  const [changeColor, setChangeColor]=useState(false);

  const handleClick=()=>{
    setChangeColor(!changeColor);
  }
  return (
    excelData.map((individualExcelData)=>(
      <tr key={individualExcelData.id}>
        <IndividualData individualExcelData={individualExcelData} style={{cursor:"pointer"}} className={`bg-primary ${(changeColor===true ? "bg-success" : "bg-primary")}`} onClick={handleClick}/>
      </tr>
    ))
  )
}

export default Data
