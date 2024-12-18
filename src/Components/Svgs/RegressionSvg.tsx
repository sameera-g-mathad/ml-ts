import React from 'react';

export const RegressionSvg: React.FC = () => {
  const svgComponentStyle = {
    fill: 'none',
    StrokeLinecap: 'round',
    StrokeLinejoin: 'round',
    StrokeWidth: '1.5px',
  };
  return (
    <div className="w-5 h-5 mr-2 svg">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          style={svgComponentStyle}
          d="M2,2V20a2,2,0,0,0,2,2H22"
        />
        <rect
          style={svgComponentStyle}
          height="6"
          rx="1.5"
          width="3"
          x="6"
          y="12"
        />
        <rect
          style={svgComponentStyle}
          height="6"
          rx="1.5"
          width="3"
          x="12"
          y="7"
        />
        <rect
          style={svgComponentStyle}
          height="6"
          rx="1.5"
          width="3"
          x="18"
          y="3"
        />
      </svg>
    </div>
  );
};

RegressionSvg.displayName = 'RegressionSvg';
