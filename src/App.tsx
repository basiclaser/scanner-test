import './App.css';
import QrReader from "react-qr-reader"
import {useState, useEffect} from "react"

interface iQrCode {
  index: number,
  content: string
}

function App() {
  const [value, setValue] = useState<String|null>("")
  const [timer, setTimer] = useState(0)
  const [total, setTotal] = useState(0)
  const [checkForUnique, setCheckForUnique] = useState(false)
  const [sort, setSort] = useState(false)
  const [scanned, setScanned] = useState<iQrCode[]>([])

  useEffect(() => {
    setInterval(()=>{setTimer(p=>p+1)},1000)
  }, []);

  const handleError = (e: Error) => {
   console.log(e)
  }
  const handleScan = (e: string | null) => {
    if (typeof e === "string") {
     console.log(e)
     if (checkForUnique) {
       const main = e.split('=')[1]
       if(main[0]==="_") return
       const index = JSON.parse(e.split('=')[1]).index
       if (!scanned.find(el=> el.index===index)) {
         if (sort) {
           setScanned((previous) =>
             [...previous, { index, content: e }].sort((a, b) => a.index - b.index)
           );
         } else {
          setScanned(p => [...p, { index, content: e }])
         }
       }
    } 
     setTotal(p=>p+1)
     setValue(e)
   }
 }
  return (
    <div className="App">
      <span>time: {timer} avgps: {(total/timer).toString().slice(0,4)} --- scans - total:{total} unique:{scanned.length}</span><br />
      <button onClick={()=>setCheckForUnique(p=>!p)}>{checkForUnique?"turn off":"turn on"} checking for unique</button>
      <button onClick={()=>setSort(p=>!p)}>{sort?"turn off":"turn on"} sorting elements</button>
      <br /> scanned codes:{scanned.map(e=>e.index + " ")}
      <br /> latest:{value}
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
 