import { Instrument } from "../types/Instrument";

export async function getAllInstrumentos(){
  const urlServer = 'http://localhost:8080/api/instrumentos/all';
  const response = await fetch(urlServer, {
      method: 'GET',
      headers: {
          'Content-type': 'application/json',
          'Access-Control-Allow-Origin':''
      },
      mode: 'cors'
  });
  return await response.json();
}

export async function getIntrumentoById(id:number){
  const urlServer = 'http://localhost:8080/api/instrumentos/get/'+id;
  console.log(urlServer);
  const response = await fetch(urlServer, {
      method: 'GET',
      headers: {
          'Content-type': 'application/json',
          'Access-Control-Allow-Origin':''
      },
      mode: 'cors'
  });
  return await response.json() as Instrument;

}