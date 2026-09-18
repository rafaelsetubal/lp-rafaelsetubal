import { ImageResponse } from "next/og"
export const alt = "Rafael Setubal — Sites e landing pages com acompanhamento"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export default function Image() {
  return new ImageResponse(<div style={{display:"flex",flexDirection:"column",justifyContent:"space-between",width:"100%",height:"100%",padding:70,background:"#f5f8ff",color:"#111111",fontFamily:"sans-serif"}}><div style={{fontSize:28}}>rafael setubal®</div><div style={{display:"flex",flexDirection:"column",fontSize:68,letterSpacing:-3,fontWeight:600}}><span>Seu negócio merece</span><span style={{color:"#3D6AFF"}}>ser encontrado.</span></div><div style={{fontSize:26,color:"#5f6368"}}>Sites · Landing pages · Acompanhamento</div></div>,size)
}
