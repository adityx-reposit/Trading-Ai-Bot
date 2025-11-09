
import { Candlesticks  } from "./lighter-sdk-ts/generated";

export  function getEMA(prices:number[], period: number) {
  const multiplier =2/(period+1);
    const smainterval = prices.length-period;
    if(prices.length<period){
        throw new Error("less prices is provided")
        return
    }
  let sma =0;
  for (let i =0;i< smainterval;i++){
    sma += (prices[i]??0)
   
  }

  sma/=period;
 const emas = [sma];
   for (let i =0 ;i<period;i++){
    const ema =(emas[emas.length-1]??0)*(1-multiplier)+(prices[smainterval+i] ?? 0)*multiplier;
    emas.push(ema);
  }
  return emas;

 


}


export function getMidPrices(candlesticks:Candlesticks[]){
  //@ts-ignore
  const midprices=candlesticks.map(({open,close}) =>   (open+close)/2);
  return midprices;
}



export function getMACD(prices:number[], shortPeriod: number, longPeriod: number, signalPeriod: number){
   const ema26 = getEMA(prices,26);
   const ema12 = getEMA(prices,12);
   const macd = ema12.map((_,index)=>(ema12[index]??0)-(ema26[index]??0));
 
   return macd;
}


