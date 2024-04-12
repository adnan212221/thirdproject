import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { server } from '../main'
import Loading from './Loading'
import '../style/exchange.scss'
import Error from './Error'

const Exchange = () => {

    const [exchange, setexchnge] = useState([]);
    const [loading, setloading] = useState(true);
    const [error, seterror]= useState(false);

    useEffect(() => {

        const fetchexchange = async() => {
            try {
                const {data} = await axios.get(`${server}/exchanges`);
                console.log(data);
                setexchnge(data);
                setloading(false);
            }
             catch (error) {
                seterror(true);
                setloading(false);
                
            }
        };

            fetchexchange();
    
    }, [])

    if (error) return <Error message={'Error while fetching exchanges'} /> ;
    

  return (
    <div className='container maincontainer'> 
    
    {loading ? <Loading /> : (

        <>
           {
            exchange.map((i) => (

                <div className='card maincard' key={i.id}>
  <img src={i.image} className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">{i.name}</h5>
    <p className="card-text">Rank : {i.trust_score_rank}</p>
    <a href={i.url} target={'_blank'} className="btn btn-primary">{i.name}</a>
  </div>
</div>
            ))
           }
</>
        
    
    )}

    </div>
  )
}

export default Exchange