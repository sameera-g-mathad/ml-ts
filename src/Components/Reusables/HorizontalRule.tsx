import React from 'react';
import { themeInterface } from '../../interface';
import withTheme from '../HOC/withTheme';
export const HorizontalRuleComponent: React.FC<themeInterface> = ({
  color,
}) => {
  return <hr style={{ borderColor: color }} className="mt-3 border" />;
};

HorizontalRuleComponent.displayName = 'HorizontalRuleComponent';

export const HorizontalRule = withTheme(HorizontalRuleComponent);
