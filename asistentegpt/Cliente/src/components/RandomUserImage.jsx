import React, { useState, useEffect } from 'react';

function RandomUserImage() {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    fetch('https://randomuser.me/api/')
      .then(response => response.json())
      .then(data => {
        setImageUrl(data.results[0].picture.large);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  return (
    <div>
      <img src={imageUrl} alt="Random User" />
    </div>
  );
}

export default RandomUserImage;
