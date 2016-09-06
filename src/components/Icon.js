// http://dmfrancisco.github.io/react-icons

import React from 'react';

export default function Icon({ icon, className = '', ...extraProps }) {
  return (
    <svg
      {...extraProps}
      className={'icon-' + icon}
      style={style.icon}
      viewBox="0 0 24 24"
      preserveAspectRatio="xMidYMid meet"
      fit
    >
      {renderGraphic(icon)}
    </svg>
  );
}

function renderGraphic(icon) {
  switch (icon) {
    case 'play':
      return <g><path d="M8 5v14l11-7z"></path></g>;
    case 'pause':
      return <g><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path></g>;
    case 'next':
      return <g><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"></path></g>;
    case 'prev':
      return <g><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"></path></g>;
    case 'volume':
      return <g><path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"></path></g>;
    case 'search':
      return <g><path d="M15.5 14h-.79l-.28-.27c.98-1.14 1.57-2.62 1.57-4.23 0-3.59-2.91-6.5-6.5-6.5s-6.5 2.91-6.5 6.5 2.91 6.5 6.5 6.5c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99 1.49-1.49-4.99-5zm-6 0c-2.49 0-4.5-2.01-4.5-4.5s2.01-4.5 4.5-4.5 4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5z"></path></g>;
    case 'clear':
      return <g><path d="M19 6.41l-1.41-1.41-5.59 5.59-5.59-5.59-1.41 1.41 5.59 5.59-5.59 5.59 1.41 1.41 5.59-5.59 5.59 5.59 1.41-1.41-5.59-5.59z"></path></g>;
    case 'menu':
      return <g><path d="M3 18h18v-2h-18v2zm0-5h18v-2h-18v2zm0-7v2h18v-2h-18z"></path></g>;
    case 'logo':
      return (<g><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4 6h-3v7c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3c.55 0 1.06.16 1.5.42V6H16v2z"></path></g>);
    case 'album':
      return (<g><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5zm0-5.5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z"></path></g>);
    case 'playlist':
      return (<g><path d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z"></path></g>);
    case 'discover':
      return (<g><path d="M11 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm7.5-2v5.22c-.31-.14-.64-.22-1-.22-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5V12h2v-2h-3.5zM11 14c-2.67 0-8 1.34-8 4v2h10.76c-.48-.72-.76-1.58-.76-2.5 0-1.18.46-2.26 1.21-3.06-1.17-.29-2.33-.44-3.21-.44z"></path></g>);
    case 'threads':
      return (<g><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z"></path></g>);
    case 'genres':
      return (<g><path d="M7 4H5v5h2V4zm12 0h-2v9h2V4zM3 13h2v7h2v-7h2v-2H3v2zm12-6h-2V4h-2v3H9v2h6V7zm-4 13h2v-9h-2v9zm4-5v2h2v3h2v-3h2v-2h-6z"></path></g>);
    case 'video':
      return (<g><path d="M7 14h-2v5h5v-2h-3v-3zm-2-4h2v-3h3v-2h-5v5zm12 7h-3v2h5v-5h-2v3zm-3-12v2h3v3h2v-5h-5z"></path></g>);
  }
}

const style = {
  icon: {
    width: '1.6em',
    height: '1.6em',
    margin: 'auto 5px',
    verticalAlign: 'middle',
  }
};
