import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PdfGeneretor from './component/PdfGenerater';
import { PDFDownloadLink , PDFViewer, pdf} from '@react-pdf/renderer';
import Form from './component/Form';
import './component/style.css'

function App() {
  const [data,setData]=useState(null);
  const [blob,setBlob]=useState('');
  const dataFromForm=(datum)=>{ 
    setData(datum);
  }
  const getBlob=(blob)=>{ 
    setBlob(blob);
  }
  const handleNullData=()=>{
    alert('null')
  }
  // const generatePdfBlob = async () => {
  //   const blob = await pdf(<PdfGeneretor data={data} />).toBlob();
  //   const url = URL.createObjectURL(blob);
  //   setBlobUrl(url);
  // };

  return (
    <div className="App">
      <Form getData={dataFromForm} setBlob={getBlob} />
      {/* <h1>Generate and Download PDF</h1>
      
      <PDFDownloadLink
        document={<PdfGeneretor data={data} />}
        fileName="PDFGeneretor.pdf"
      >
        {({ blob, url, loading, error }) => (
          <button>
            {loading ? 'Generating PDF...' : 'Download PDF'}
          </button>
        )}
      </PDFDownloadLink> */}
      
      {/* <PdfGeneretor/> */}
    </div>
  );
}

export default App;