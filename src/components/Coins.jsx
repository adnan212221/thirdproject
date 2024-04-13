import React, { useEffect, useState } from 'react'
import Loading from './Loading';
import { server } from '../main';
import Error from './Error';
import axios from 'axios'
import '../style/coins.scss'
import { Link } from 'react-router-dom';


const Coins = () => {
  const [coins, setcoin] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror]= useState(false);
  const [page, setpage] = useState(1);
  const [currency, setcurrency] = useState('inr');
  // const pagination = useState([])

  const currencysymbol = currency==='inr'?'₹': currency=== 'eur'?'€':'$';

  const changepage = (page) =>{
    setloading(true);
    setpage(page);
    
  }
  const [radioValue, setRadioValue] = useState('inr');
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

 

  const btns = new Array(132).fill(1)

  useEffect(() => {

      const fetchcoins = async() => {
          try {
              const {data} = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
              console.log(data);
              setcoin(data);
              setloading(false);
          }
           catch (error) {
              seterror(true);
              setloading(false);
              
          }
      };

      fetchcoins();
  
  }, [currency, page])

  if (error) return <Error message={'Error while fetching coins'} /> ;

  

  

return (
  <div className='container maincontainer'> 
  
  {loading ? <Loading /> : (

      <>
      
<div className='mainradio'>
<div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="inr" onChange={onChange}/>
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
         {
          coins.map((i) => (
            // <div>{i.name}</div>
<Link to={`/coin/${i.id}`}  style={{ textDecoration: 'none' }}  key={i.id}>
              <div className='card maincard' key={i.id}>
<img src={i.image} className="card-img-top" alt="..." />
<div className="card-body">
  <h5 className="card-title">{i.name}</h5>
  <p className="card-text">Current price : {currencysymbol} {i.current_price}</p>
  {/* <a href={i.url} target={'_blank'} className="btn btn-primary">{i.name}</a> */}
</div>
</div>
</Link>
          ))
         }

          
  {/* <button className='btn' onClick={()=> changepage(2)}>2</button> */}
  <div className='container mainpagenation'>
    {
      btns.map((item, index) => (
   <button className='btn pagenation' key={index} onClick={()=> changepage(2)}>{index + 1}</button> 
   ))
    } 
  </div>

</>

      
  
  )}
 

  </div>
  )
}

export default Coins