/* eslint-disable jsx-a11y/iframe-has-title */
import React from 'react';
import './Page404.css';

function Page404(): JSX.Element {
  return (
    <div className="Page404">
      <p>The Page you are looking for doesn't exist</p>
      <iframe
        title="YouTube Video"
        width="560"
        height="315"
        src="https://www.youtube.com/embed/t3otBjVZzT0?autoplay=1"
        allow="autoplay"
        loading="lazy"
      ></iframe>
    </div>
  );
}

export default Page404;

