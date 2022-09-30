import { useState } from "react"


export default function useFormatDate(inputDate) {

  // const [formato1, setFormato1] = useState('Formato 1')
  // const [formato2, setFormato2] = useState('Formato 2')

  let formato1 = "formato 1"

if(typeof inputDate == String){
  console.log('inputdate = string')
} else {
  console.log('inputdate != string', typeof inputDate)
}
    
  //const formato2 = () => inputDate.toLocaleDateString('es-CL', { year: 'numeric',month: '2-digit',day: '2-digit' })


  console.log('inputDate.type', typeof inputDate, formato1)

  

  

  //console.log('inputDate string',   )

  // if(inputDate.length > 8){
  //   formato1 = inputDate.toLocaleDateString('es-CL', { year: 'numeric',month: '2-digit',day: '2-digit' })
  //   formato2 = formato1.replaceAll('-','/')
  // }

  // if (inputDate.length <= 8) {
  //   formato1 = inputDate.replaceAll('/','-')
  // } 
    
    //console.log('fechas:', formato1, formato2 )
// con slash ejemplo:  01/09/2022
    return formato1
  }
  
