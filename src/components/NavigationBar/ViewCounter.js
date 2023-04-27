import React, { useState, useEffect } from 'react';
import {Box, Text} from '@chakra-ui/react'

function ViewCounter() {
  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    const storedViews = sessionStorage.getItem('viewCount');
    if (storedViews) {
      const newViews = parseInt(storedViews) + 1;
      setViewCount(newViews);
      sessionStorage.setItem('viewCount', newViews);
    } else {
      setViewCount(1);
      sessionStorage.setItem('viewCount', 1);
    }
  }, []);

  return (
    <Box
    m='-10px'
    >
      <p>Number of views: {Math.round((parseInt(viewCount) + 1) / 2)}</p>
    </Box>
  );
}

export default ViewCounter;
