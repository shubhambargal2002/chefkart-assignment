import React, { useState } from 'react'
import Data from './components/Data'
import { read, utils } from 'xlsx';

function App() {
  const [excelFile, setExcelFile]=useState(null);
  const [excelFileError, setExcelFileError]=useState(null);
  const [excelData, setExcelData]=useState(null);
  const [order, setOrder]=useState("ASC");
  
  const sorting=(col)=>{
      if(order==="ASC"){
        const sorted=[...excelData].sort((a,b)=>
          a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
        );
        setExcelData(sorted);
        setOrder("DSC");
      }
      if(order==="DSC"){
        const sorted=[...excelData].sort((a,b)=>
          a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
        );
        setExcelData(sorted);
        setOrder("ASC");
      }
  }

  const fileType=['text/csv'];
  const handleChange=(e)=>{
      let selectedFile=e.target.files[0];
      if(selectedFile){
        if(selectedFile && fileType.includes(selectedFile.type)){
            let reader=new FileReader();
            reader.readAsArrayBuffer(selectedFile);
            reader.onload=(e)=>{
              setExcelFileError(null);
              setExcelFile(e.target.result);
            }
        }
        else{
            setExcelFileError("Please select only Excel file type");
            setExcelFile(null);
        }
      }
      else{
        console.log("Please select your file");
      }
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(excelFile!==null){
        const workbook=read(excelFile,{type:'buffer'});
        const workSheetName=workbook.SheetNames[0];
        const workSheet=workbook.Sheets[workSheetName];
        const data=utils.sheet_to_json(workSheet);
        setExcelData(data);
    }
    else{
      setExcelData(null);
    }
  }
  return (
    <>
    <div className="container">
      <div className="form">
        <form className="form-group" autoComplete='off' onSubmit={handleSubmit}>
          <label ><h5>Upload Excel File</h5></label>
          <br /><br />
          <input type="file" className='form-control' onChange={handleChange} required />
          {excelFileError && <div className='text-danger' style={{marginTop:"5px"}}>{excelFileError}</div>}
          <button type='submit' className="btn btn-success" style={{marginTop:"20px"}}>Submit</button>
        </form>
      </div>
      <br /><br />

      <h5>View Excel File</h5>
      <div className='viewer'>
        {excelData===null && <>No file selected</>}
        {excelData!==null && (
          <div className='table-responsive'>
            <table className='table table-striped'>
              <thead>
                <tr>
                  <th scope='col'>ID</th>
                  <th scope='col'>First Name<i className="fa-solid fa-ellipsis-vertical" onClick={()=>sorting("first_name")} style={{cursor:"pointer",marginLeft:"10px"}}></i>
                  </th>
                  <th scope='col'>Last Name</th>
                  <th scope='col'>Email</th>
                  <th scope='col'>Gender</th>
                  <th scope='col'>Status</th>
                  <th scope='col'>Mobile</th>                  
                </tr>
              </thead>
              <tbody>
                <Data excelData={excelData}/>
              </tbody>
            </table>            
          </div>
        )}       
      </div>
    </div>
    </>
  );
}

export default App;
