import './App.css';
import QrReader from "react-qr-reader"
import {useState} from "react"

function App() {
  const [value, setValue] = useState<String|null>("")
  const [total, setTotal] = useState(0)
  const [checkForUnique, setCheckForUnique] = useState(false)
  const [scannedIndices, setScannedIndices] = useState<Number[]>([])
  const handleError = (e: Error) => {
   console.log(e)
 }
  const handleScan = (e: string | null) => {
   console.log(e)
   if (typeof e === "string") {
     if (checkForUnique) {
      const main = e.split('=')[1]
      if(main[0]==="_") return
      const index = JSON.parse(e.split('=')[1]).index
      if(!scannedIndices.includes(index)) setScannedIndices(p => [...p, index])
    } 
     setTotal(p=>p+1)
     setValue(e)
   }
 }
  return (
    <div className="App">
      <button onClick={()=>setCheckForUnique(p=>!p)}>{checkForUnique?"turn off":"turn on"} checking for unique</button>
      <span>scans - total:{total} unique:{scannedIndices.length} <br /> latest:{value}</span>
      <QrReader
        className="reader"
        delay={10}
        onError={handleError}
        onScan={handleScan}
      />
    </div>
  );
}

export default App;
