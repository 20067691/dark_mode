import React from 'react';
import { useQuery } from 'react-query';
import { getMovieAvailability } from '../../api/tmdb-api';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

const MovieAvailability = ({ movieId }) => {
  const { data: availabilityData, error, isLoading, isError } = useQuery(
    ['movieAvailability', { id: movieId }],
    getMovieAvailability
  );


  // Check if the data is still loading
  if (isLoading) {
    return <p>Loading movie availability...</p>;
  }

  // Check for errors in fetching the data
  if (isError) {
    return <p>Error loading movie availability: {error.message}</p>;
  }

  // Check if the data is present
  if (!availabilityData || !availabilityData.results) {
    return <p>No availability data found for this movie.</p>;
  }

  // Accessing data for Ireland (you can change the country code as needed)
  const irelandData = availabilityData.results.IE;

  if (!irelandData) {
    return <p>No availability data found for Ireland.</p>;
  }

  console.log(availabilityData)
  console.log(irelandData)

  return (
    <div>
      <h3>Watch Now:</h3>
      <a href={irelandData.link} target="_blank" rel="noopener noreferrer">
        Watch on TMDB
      </a>
  
      <h3>Rent:</h3>
      {irelandData.rent.map((a) => (
        <Box key={a.provider_id} sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                <img
        src={`https://image.tmdb.org/t/p/w200/${a.logo_path}`}
        alt={a.provider_name}
        style={{ width: 40, height: 40, marginRight: 8 }}
      />
          <Typography>{a.provider_name}</Typography>
        </Box>
      ))}

      
    
      <h3>Buy:</h3>
      {irelandData.buy.map((b) => (
      <Box key={b.provider_id} sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
      <img
        src={`https://image.tmdb.org/t/p/w200/${b.logo_path}`}
        alt={b.provider_name}
        style={{ width: 40, height: 40, marginRight: 8 }}
      />
      <Typography>{b.provider_name}</Typography>
    </Box>
      ))}
    </div>
  );
      }
  

export default MovieAvailability;
