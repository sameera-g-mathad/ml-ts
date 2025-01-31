import React, { useState, useEffect } from 'react';
import { switchProps, themeInterface } from '../../interface';
import withTheme from '../HOC/withTheme';
/**
 *
 * @param {string} switchName - This has to be a unique name for the component, else there would be unexpected behaviour if multiple switch components are rendered
 * @param {()=>|undefined} callback This is to support renderProps, which is optional
 * @returns
 */
export const SwitchComponent: React.FC<switchProps & themeInterface> = ({
  switchName,
  callback,
  color,
}) => {
  const [checked, isChecked] = useState<boolean>(false);

  useEffect(() => {
    if (callback) callback(checked);
  }, [checked, callback]);

  const switchClick = (e: React.ChangeEvent<HTMLDivElement>) => {
    isChecked((prevState) => !prevState);
  };

  return (
    <div className="rounded-xl">
      <input
        className="switch-input hidden"
        type="checkbox"
        name={switchName}
        checked={checked}
        id={switchName}
        onChange={switchClick}
      />
      <label
        style={{
          borderColor: color,
          ...({ '--color': color } as React.CSSProperties),
        }}
        htmlFor={switchName}
        className="switch border"
      ></label>
    </div>
  );
};

SwitchComponent.displayName = 'SwitchComponent';

export const Switch = withTheme(SwitchComponent);
