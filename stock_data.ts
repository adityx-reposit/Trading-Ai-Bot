import {
    CandlestickApi,
    IsomorphicFetchHttpLibrary,
    ServerConfiguration,
  } from "./lighter-sdk-ts/generated";
  import { getEMA, getMACD, getMidPrices } from "./indicator";
  const BASE_URL = "https://mainnet.zklighter.elliot.ai";
  const SOL_MARKET_ID = 0;
  
  const klinesApi = new CandlestickApi({
    baseServer: new ServerConfiguration<{}>(BASE_URL, {}),
    httpApi: new IsomorphicFetchHttpLibrary(),
    middleware: [],
    authMethods: {},
  });
  
  export async function getIndicator(duration: "5m" | "4h", marketId: number) {
    // Calculate start timestamp based on resolution and number of candles needed
    // For 5m: 50 candles * 5 minutes = 250 minutes = ~4.2 hours
    // For 4h: 50 candles * 4 hours = 200 hours = ~8.3 days
    const hoursBack =
      duration === "5m"
        ? Math.ceil((50 * 5) / 60) // ~4.2 hours for 5m candles
        : 50 * 4; // 200 hours for 4h candles
  
    const klines = await klinesApi.candlesticks(
      marketId,
      duration,
      Date.now() - 1000 * 60 * 60 * hoursBack,
      Date.now(),
      50,
      false
    );
  
    console.log("Long position " + duration);
    const midprice = getMidPrices(klines.candlesticks);
    const ema20 = getEMA(midprice, 20);
    const macd = getMACD(midprice, 26, 14, 9);
  
  
  
    return {
      midprice: midprice.slice(-10),
      ema20: ema20 ?? [] .slice(-10),
     macd: macd ?? [] .slice(-10),
    };
    }
  
  
  
  