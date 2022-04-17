import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function Details() {

    let [searchParam] = useSearchParams();
    let myId = searchParam.get("id");
    let baseImgUrl = "https://image.tmdb.org/t/p/original";
    let [myDetails, setMyDetails] = useState({});

    async function getDetails() {
        let {data} = await axios.get(`https://api.themoviedb.org/3/movie/${myId}?api_key=c636ed7787cc302d96bf88ccf334e0d8&language=en-US`);
        setMyDetails(data);
    }

    useEffect(() => {
        getDetails();
    })

  return (
    <div className="row my-5">
        <div className="col-md-4 mb-5">
             <img src={`${baseImgUrl}${myDetails.poster_path}`} alt="aa" className='w-100'/>
        </div>   
        <div className="col-md-6 offset-md-1 text-center">
            <h1 className='mb-4 text-uppercase'>{myDetails.original_title}</h1>
            <h5 className='text-center text-capitalize mb-4'>{myDetails.overview}</h5>
            <div className="cont d-flex justify-content-between flex-wrap mt-5 text-start">
            <h5 className='text-capitalize w-50 mb-3'>type : <span className='text-info fw-bold'>{myDetails.adult ? "+18 years" : "family"}</span></h5>    
            <h5 className='text-capitalize w-50'>year : <span className='text-info fw-bold'>{myDetails.release_date}</span></h5>    
            <h5 className='text-capitalize w-50'>language :<span className='text-info fw-bold'> {myDetails.original_language}</span></h5>    
            <h5 className='text-capitalize w-50'>vote :<span className='text-info fw-bold'> {myDetails.vote_average}</span></h5>
            </div>
        </div> 
    </div>
  )
}
