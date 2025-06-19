import React from 'react';

export const ClassificationSvg: React.FC = () => {
  const svgComponentStyle = {
    fill: 'none',
    StrokeLinecap: 'round',
    StrokeLinejoin: 'round',
    StrokeWidth: '1.5px',
  };
  return (
    <div className="w-5 h-5 mr-2 svg">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <circle style={svgComponentStyle} cx="12" cy="6" r="3" />
        <rect
          style={svgComponentStyle}
          height="5"
          rx="2"
          width="8"
          x="2"
          y="16"
        />
        <rect
          style={svgComponentStyle}
          height="5"
          rx="2"
          width="8"
          x="14"
          y="16"
        />
        <path
          style={svgComponentStyle}
          d="M6,16V14a2,2,0,0,1,2-2h8a2,2,0,0,1,2,2v2"
        />
        <line style={svgComponentStyle} x1="12" x2="12" y1="9" y2="12" />
      </svg>
    </div>
  );
};

ClassificationSvg.displayName = 'ClassficationSvg';
