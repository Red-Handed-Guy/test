


function getResponseData(res: Response) {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка: ${res.status}`)
}


interface IRates  {
  USD: number
  RUB: number
  GBP: number
  CZK: number
  EUR: number
  TRY: number
  KZT: number
}

export interface IGetData {
	rates: IRates
}


export const getData = ():Promise<IGetData> =>{
  return fetch(`https://open.er-api.com/v6/latest/USD`, {
    method: 'GET',
  }).then(res => {
    return getResponseData(res)
  })
}