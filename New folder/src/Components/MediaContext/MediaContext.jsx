import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export let MediaContext = createContext([]);

export function MediaContextProvider(props){

    let baseImgUrl = "https://image.tmdb.org/t/p/original";
    let [trendingMovies, setTrendingMovies] = useState([])
    let [trendingTvShowes, setTrendingTvShowes] = useState([])
  
    async function getTrendingItems (searchKey) {
      let {data} = await axios.get(`https://api.themoviedb.org/3/trending/${searchKey}/week?api_key=941d7c8adac166c6d12ed7428eec2753`)
      if(searchKey === "movie")setTrendingMovies(data.results)
      if(searchKey === "tv")setTrendingTvShowes(data.results)
    }
  
    useEffect(async() => {
      await getTrendingItems("movie")
      await getTrendingItems("tv")
    },[]);

    return <MediaContext.Provider value={{trendingMovies, trendingTvShowes, baseImgUrl}}>
        {props.children}
    </MediaContext.Provider>
}
