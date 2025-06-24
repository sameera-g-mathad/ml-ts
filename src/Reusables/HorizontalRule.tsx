import React from 'react';
import { themeInterface } from '../interface';
import { withTheme } from '../HOC';
export const HorizontalRuleComponent: React.FC<themeInterface> = ({
  secondaryColor,
}) => {
  return <hr style={{ borderColor: secondaryColor }} className="my-3 border" />;
};

HorizontalRuleComponent.displayName = 'HorizontalRuleComponent';

export const HorizontalRule = withTheme(HorizontalRuleComponent, ['secondaryColor']);
