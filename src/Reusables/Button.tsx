import React, { useContext } from 'react';
import { buttonInterface, themeInterface } from '../interface';
import { ConditionalContext } from '../Context';
import { withTheme } from '../HOC';


/**
 * Button component is responsible for rendering a button that can be used to trigger actions.
 * It takes in a name, an optional icon component, a callback function to handle clicks, and a disabled state.
 * The button's appearance is styled based on the provided theme.
 */
export const ButtonComponent: React.FC<buttonInterface & themeInterface> = ({
  name,
  conditionalDisplay,
  iconComponent,
  callback,
  secondaryColor,
  disabled,
}) => {
  const { setConditionalDisplay } = useContext(ConditionalContext);
  if (conditionalDisplay === undefined) conditionalDisplay = true;
  return (
    <button
      aria-label='Hover here'
      disabled={disabled}
      style={{
        ...({ '--use-color': secondaryColor } as React.CSSProperties),
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
      className="button border-2 py-1 sm:px-4 px-3 mr-1 rounded-xl tracking-wide capitalize"
      onClick={() => {
        callback && callback();
        if (conditionalDisplay) setConditionalDisplay(false)
      }}
    >
      <span className="flex justify-evenly items-center">
        {iconComponent && iconComponent()}
        {name}
      </span>
    </button>
  );
};

ButtonComponent.displayName = 'ButtonComponent';

export const Button = withTheme(ButtonComponent, ['secondaryColor']);
