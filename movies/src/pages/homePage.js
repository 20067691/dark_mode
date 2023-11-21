import React, { useState } from 'react';
import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'

import { Pagination } from '@mui/material';




const HomePage = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const {  data, error, isLoading, isError, refetch }  = useQuery
  (['discover', { page: currentPage }], getMovies)
  
  
  

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message }</h1>
  }  
  const movies = data.results;

  
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    console.log(page)
    refetch({ currentPage }); // Use the updated page value
  };
  

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites)) 

  console.log("search ids",getMovies)

  return (
    <>

      
    <PageTemplate
      title="Discover Movies"
      movies={movies}
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />
      }}
    />
    <Pagination style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }} 
    count={10} 
    color = "secondary" 
    page={currentPage} 
    onChange={handlePageChange} 
    size={'large'}
      />
    </>
);
};
export default HomePage;