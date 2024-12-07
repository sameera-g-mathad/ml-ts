import React, { useState, useEffect } from 'react';

interface switchProps {
  switchName: string;
  callback?: (change: boolean) => any;
}

/**
 *
 * @param {string} switchName - This has to be a unique name for the component, else there would be unexpected behaviour if multiple switch components are rendered
 * @param {()=>|undefined} callback This is to support renderProps, which is optional
 * @returns
 */
export const Switch: React.FC<switchProps> = ({ switchName, callback }) => {
  const [checked, isChecked] = useState<boolean>(false);

  useEffect(() => {
    if (callback) callback(checked);
  }, [checked, callback]);

  const switchClick = (e: React.ChangeEvent<HTMLDivElement>) => {
    isChecked((prevState) => !prevState);
  };

  return (
    <div className="shadow-lg rounded-xl">
      <input
        className="switch-input hidden"
        type="checkbox"
        name={switchName}
        checked={checked}
        id={switchName}
        onChange={switchClick}
      />
      <label htmlFor={switchName} className="switch"></label>
    </div>
  );
};

Switch.displayName = 'Switch';
