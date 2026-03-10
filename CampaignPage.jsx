import { useState } from "react"
import { generateCampaign } from "../services/api"
import { jsPDF } from "jspdf"

function CampaignPage(){

const [product,setProduct]=useState("")
const [audience,setAudience]=useState("")
const [platform,setPlatform]=useState("")
const [tone,setTone]=useState("Professional")
const [campaignType,setCampaignType]=useState("Social Media")

const [result,setResult]=useState("")
const [loading,setLoading]=useState(false)

const submit = async()=>{

if(!product || !audience || !platform){
setResult("Please fill all fields.")
return
}

const form = new FormData()

form.append("product",product)
form.append("audience",audience)
form.append("platform",platform)
form.append("tone",tone)
form.append("campaign_type",campaignType)

setLoading(true)

try{
const res = await generateCampaign(form)
setResult(res.data.result)
}
catch(err){
console.error(err)
setResult("Error generating campaign")
}

setLoading(false)

}

const clearFields = () => {
setProduct("")
setAudience("")
setPlatform("")
setTone("Professional")
setCampaignType("Social Media")
setResult("")
}

const copyResult = () => {
navigator.clipboard.writeText(result)
}

const exportPDF = () => {

const doc = new jsPDF()

doc.text("MarketMind AI Strategy",20,20)

const splitText = doc.splitTextToSize(result,170)

doc.text(splitText,20,40)

doc.save("marketing-strategy.pdf")

}

/* EMAIL STRATEGY */

const emailStrategy = () => {

const subject = encodeURIComponent("AI Generated Marketing Strategy")
const body = encodeURIComponent(result)

/* Gmail compose link */

const gmailURL =
`https://mail.google.com/mail/?view=cm&fs=1&su=${subject}&body=${body}`

window.open(gmailURL,"_blank")

}

return(

<div className={`app ${result ? "generated" : ""}`}>

<div className="input-panel">

<h1>MarketMind AI</h1>
<p>AI Marketing Strategy Generator</p>

<input
value={product}
placeholder="Product"
onChange={(e)=>setProduct(e.target.value)}
/>

<input
value={audience}
placeholder="Target Audience"
onChange={(e)=>setAudience(e.target.value)}
/>

<input
value={platform}
placeholder="Platform"
onChange={(e)=>setPlatform(e.target.value)}
/>

<select value={tone} onChange={(e)=>setTone(e.target.value)}>
<option>Professional</option>
<option>Fun</option>
<option>Luxury</option>
<option>Aggressive</option>
</select>

<select value={campaignType} onChange={(e)=>setCampaignType(e.target.value)}>
<option>Social Media</option>
<option>Email Marketing</option>
<option>Product Launch</option>
<option>Ad Copy</option>
</select>

<button onClick={submit}>
{loading ? "Generating..." : "Generate Strategy"}
</button>

<button className="clear" onClick={clearFields}>
Clear
</button>

</div>

<div className="result-panel">

<h2>AI Strategy</h2>

<pre>{result || "Your AI strategy will appear here."}</pre>

{result && (
<div className="result-actions">

<button onClick={copyResult}>
Copy
</button>

<button className="export" onClick={exportPDF}>
Export PDF
</button>

<button onClick={emailStrategy}>
Send via Email
</button>

</div>
)}

</div>

</div>

)

}

export default CampaignPage