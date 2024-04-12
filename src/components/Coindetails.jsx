import React, { useEffect, useState } from 'react'
import Loading from './Loading';
import axios from 'axios';
import { server } from '../main';
import { useParams } from 'react-router-dom';
import Error from './Error';
import '../style/coindetails.scss'
import { RiArrowDropDownFill, RiArrowUpSFill } from "react-icons/ri";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import ProgressBar from 'react-bootstrap/ProgressBar';
import Chart from './Chart';

function BasicExample() {
  return <ProgressBar now={60}  />;
}



const Coindetails = () => {

  const [coin, setcoin] = useState({});
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(false);
  const [currency, setcurrency] = useState('inr');
  const params = useParams();
  const [radioValue, setRadioValue] = useState('inr');
  const[days, setdays] = useState('24h');
  const[chartarray, setchartarray] = useState([]);
  const btns = ['24h', '7d', '14d', '30d', '60', '200d', '365d', 'max']

  const switchstats = (key) =>{
    switch (key) {
      case '24h':
        setdays('24h');
        setloading(true);
        break;

      case '7d':
        setdays('7d');
        setloading(true);
        break;

      case '14d':
        setdays('14d');
        setloading(true);
        break;

      case '30d':
        setdays('30d');
        setloading(true);
        break;

      case '60d':
        setdays('60d');
        setloading(true);
        break;

        case '200d':
          setdays('200d');
          setloading(true);
          break;
          
          case '365d':
        setdays('365d');
        setloading(true);
        break;

        case 'max':
        setdays('max');
        setloading(true);
        break;
    
      default:
        setdays('24h');
        setloading(true);
        break;
        break;
    }
  }


  const currencysymbol = currency==='inr'?'₹': currency=== 'eur'?'€':'$';

  
  const onChange = (ev) => {
    //save your value here with state variable
    console.log(ev.target.value);
    setRadioValue(ev.target.value);
   try {
    setcurrency(ev.target.value);
   } catch (error) {
    seterror(true);
   }
    
  };


  useEffect(() => {
  
    const fetchcoin = async () =>{
     try {
      const {data} = await axios.get(`${server}/coins/${params.id}`);
      const {data: chartdata} = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`)
      // console.log(chartdata);
      // console.log(data);
      setloading(false);
      setcoin(data);
      setchartarray(chartdata.prices);
     } catch (error) {
      seterror(true)
     }
    }
    

    fetchcoin();
  

  }, [params.id, currency, days])
  

  if (error) return <Error message={'Error while fetching coin'} /> ;


  return (
    
    
    <>


    <div className='container maincontainer'>
      {
        loading ? <Loading /> : (
          <>
            <div className='mainradio'>
<div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="inr" onChange={onChange} />
  <label className="form-check-label" htmlFor="inlineRadio1">₹ inr</label>
</div>
<div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="usd" onChange={onChange}/>
  <label className="form-check-label" htmlFor="inlineRadio2">$ usd</label>
</div>
<div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="eur" onChange={onChange} />
  <label className="form-check-label" htmlFor="inlineRadio2">€ eur</label>
</div>
            </div>

            <Chart arr={chartarray} currency={currencysymbol} days={days} />

            <div className="container">
              {
                btns.map((i)=>(
                  <button className='btn btn-primary' key={i} onClick={()=>switchstats(i)}>{i}</button>

                ))
              }
            </div>

            <div className="container">
              <div className="time">
              <img src={coin.image.small} alt="" />
                <span>Last updated on {Date(coin.market_data.last_updated).split('G')[0]}</span>
                
                </div>
              <p>{currencysymbol}{coin.market_data.ath[currency]}</p>
              {/* <p><BiSolidUpArrow className='arrow1'/></p> */}
              <p><BiSolidDownArrow className={coin.market_data.market_cap_change_percentage_24h>0? "arrow1" : "arrow2"} />{coin.market_data.market_cap_change_percentage_24h}%</p>
            </div>
            <div className="rank container">
              <p className='caprank'>{coin.market_cap_rank}</p>
              <BasicExample  />
              <div className="high-low">
                <span className='high'>{currencysymbol}{`${coin.market_data.high_24h[currency]}`}</span>
                <span className='low'>{currencysymbol}{`${coin.market_data.low_24h[currency]}`}</span>
              </div>

              <div className="summary">
                <div className="maxsupply"> <div className="maxtitle">Max Supply</div> <div className="maxquantity">{coin.market_data.max_supply}</div> </div>
                <div className="maxsupply"> <div className="maxtitle">Circulating Supply</div> <div className="maxquantity">{coin.market_data.circulating_supply}</div> </div>
                <div className="maxsupply"> <div className="maxtitle">Market Cap</div> <div className="maxquantity">{currencysymbol}{coin.market_data.market_cap[currency]}</div> </div>
                <div className="maxsupply"> <div className="maxtitle">All Time High</div> <div className="maxquantity">{currencysymbol}{coin.market_data.ath[currency]}</div> </div>
                <div className="maxsupply"> <div className="maxtitle">All Time Low</div> <div className="maxquantity">{currencysymbol}{coin.market_data.atl[currency]}</div> </div>


              </div>
            </div>
          </>
        )
      }

    </div>




    
    </>
  )
}

export default Coindetails