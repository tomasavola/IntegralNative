// useYouTubeInfo.js

import { useState, useEffect } from 'react';
import axios from 'axios';

const useYouTubeInfo = (videoId) => {
  const [videoInfo, setVideoInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getVideoInfo = async () => {
      try {
        const apiKey = 'TU_CLAVE_DE_API'; // Reemplaza con tu clave de API de YouTube

        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`
        );

        const fetchedVideoInfo = response.data.items[0].snippet;
        setVideoInfo(fetchedVideoInfo);
      } catch (error) {
        setError(error.message);
      }
    };

    if (videoId) {
      getVideoInfo();
    }
  }, [videoId]);

  return { videoInfo, error };
};

export default useYouTubeInfo;
