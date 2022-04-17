import React, { useContext } from 'react';
import style from './tvShowes.module.css';
import { MediaContext } from './../MediaContext/MediaContext';

export default function TvShowes() {

  let {trendingTvShowes, baseImgUrl} = useContext(MediaContext)

  return (
    <div className="row my-5">
        <div className="col-md-4 col-sm-12 d-flex align-items-center">
          <div className="text-capitalize my-5 w-75">
            <div className={`${style.brdrtop} bg-warning mb-3`}></div>
            <h2>trending</h2>  
            <h2>tv showes</h2>  
            <h2>to watch now</h2>  
            <p className='text-muted mt-4'>most watched tv shows by week</p>
            <div className={`${style.brdrb} bg-warning mt-3`}></div>
          </div>
        </div>
        {trendingTvShowes.length ? trendingTvShowes.map((TvShowes, index) =>
          <div className="col-md-2 col-sm-6 text-center mb-4" key={index}>
            <div className="item">
              <img src={`${baseImgUrl}${TvShowes.poster_path}`} alt="imag" className={`${style.img} mb-3`}/>
              <h5>{TvShowes.name}</h5>
            </div>  
          </div>
        ) : ""}   
      </div>
  )
}
