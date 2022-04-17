import axios from 'axios';
import style from "./Home.module.css";
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MediaContext } from './../MediaContext/MediaContext';

export default function Home() {

  let {trendingMovies, baseImgUrl, trendingTvShowes} = useContext(MediaContext)

  let navigate = useNavigate();

  function goToDetails(id){
    navigate({
      pathname : "/details",
      search : `?id=${id}`
    })
  }

  return (
    <> 
      <div className="row mt-5">
        <div className="col-md-4 col-sm-12 d-flex align-items-center">
          <div className="text-capitalize my-5 w-75">
            <div className={`${style.brdrtop} bg-warning mb-3`}></div>
            <h2>trending</h2>  
            <h2>movies</h2>  
            <h2>to watch now</h2>  
            <p className='text-muted mt-4'>most watched movies by week</p>
            <div className={`${style.brdrb} bg-warning mt-3`}></div>
          </div>
        </div>
        {trendingMovies.length ? trendingMovies.map((movie, index) =>
          <div onClick={() => goToDetails(movie.id)} className="col-md-2 col-sm-6 text-center mb-4" key={index}>
            <div className="item">
              <img src={`${baseImgUrl}${movie.poster_path}`} alt="imag" className={`${style.img} mb-3`}/>
              <h5>{movie.title}</h5>
            </div>  
          </div>
        ) : ""}   
      </div>
      <hr className={`${style.hr} bg-warning my-5`}/>
      <div className="row mb-5">
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
    </>

  )
}
