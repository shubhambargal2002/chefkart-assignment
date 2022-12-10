import React  from 'react'

const IndividualData = ({individualExcelData}) => {
  return (
    <>
      <td>{individualExcelData.id}</td>
      <td>{individualExcelData.first_name}</td>
      <td>{individualExcelData.last_name}</td>
      <td>{individualExcelData.email}</td>
      <td>{individualExcelData.gender}</td>
      <td className={`${individualExcelData.status==="true" ? 'text-success' : 'text-danger'}`}>{individualExcelData.status}</td>
      <td>{individualExcelData.mobile}</td>
    </>
  )
}

export default IndividualData
