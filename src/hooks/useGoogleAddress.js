import { useEffect, useState } from 'react';
import axios from 'axios';

const useGoogleAddress = (address) => {
  const [map, setMap] = useState({});
  const API = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyBgKoA9gpYd17xVyF132LwLAmXS2cWFejY`;

  useEffect(() => {
    const callApi = async () => {
      const response = await axios(API);
      setMap(response.data.results[0].geometry.location);
    };
    callApi();
  }, []);

  return map;
};

export default useGoogleAddress;
