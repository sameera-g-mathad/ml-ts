import React, { useState, useEffect } from 'react';
import { switchProps, themeInterface } from '../interface';
import { withTheme } from '../HOC';
/**
 *
 * @param {string} switchName - This has to be a unique name for the component, else there would be unexpected behaviour if multiple switch components are rendered
 * @param {()=>|undefined} callback This is to support renderProps, which is optional
 * @returns
 */
export const SwitchComponent: React.FC<switchProps & themeInterface> = ({
  switchName,
  names,
  callback,
  secondaryColor,
}) => {
  const [checked, isChecked] = useState<boolean>(false);

  useEffect(() => {
    if (callback) callback(checked);
    // eslint-disable-next-line 
  }, [checked]);
  // }, [checked, callback]);

  const switchClick = (e: React.ChangeEvent<HTMLDivElement>) => {
    isChecked((prevState) => !prevState);
  };

  return (
    <div className='flex gap-2 items-center'>
      <label>{names && names[0]}</label>
      <div className="rounded-xl">
        <input
          className="switch-input hidden"
          type="checkbox"
          name={switchName}
          checked={checked}
          id={switchName}
          onChange={switchClick}
        />
        {/* <span> */}

        <label
          style={{
            borderColor: secondaryColor,
            ...({ '--color': secondaryColor } as React.CSSProperties),
          }}
          htmlFor={switchName}
          className="switch border"
        ></label>

        {/* </span> */}
      </div>
      <label>{names && names[1]}</label>
    </div>
  );
};

SwitchComponent.displayName = 'SwitchComponent';

export const Switch = withTheme(SwitchComponent, ['secondaryColor']);
