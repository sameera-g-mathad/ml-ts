/**
 * This interface is for container components that are used throughout the website.
 * Components extending this mean they are expecting children as prop, i.e
 * they need to be defined as html tags
 */

export interface childrenProp {
  children: React.ReactNode;
}

/**
 * This interface is used by themeContext.
 */
export interface themeInterfaceByContext {
  theme: 'light' | 'dark';
  useColor: string;
  changeTheme?: (change: boolean) => void;
}

/**
 * Used by ChatContext
 */
export interface chatInterfaceByContext {
  chatComponents: JSX.Element[];
  appendChatComponent: (Component: JSX.Element) => void;
}

/**
 * Used by Chat.tsx to decide the displaying of elements on either side of the display.
 * It uses enum which specifies that the generatedBy can have only two values.
 */
export enum GeneratedBy {
  user = 'user',
  system = 'system',
}
export interface chatInterface {
  gerneratedBy: GeneratedBy;
}

/**
 * Used by Switch in Reusables
 */
export interface switchProps {
  switchName: string;
  callback?: (change: boolean) => any;
  color?: string;
}

/**
 * Used by Button component in Reusables
 */
export interface buttonInterface {
  name: string;
  callback?: () => any;
}

// export interface webProperties {
//   borderColor: string;
//   fillColor: string;
//   background: string,
//   textColor: string,
// }
