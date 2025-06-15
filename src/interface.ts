import { DataFrame } from './ml-ts/frame';
import { NDArray } from './ml-ts/numts';

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
  task: 'Regression' | 'Classification';
  df: DataFrame;
  trainX: NDArray | null;
  trainY: NDArray | null;
  testX: NDArray | null;
  testY: NDArray | null;
  length?: number;
  appendChatComponent: (Component: JSX.Element) => void;
  updateTask: (task: string) => void;
  updateTaskAndAppendChat: (task: string, Component: JSX.Element) => void;
  addDataframe: (df: DataFrame) => void;
}

/**
 * Used by Task.tsx to decide the task type.
 * It uses enum which specifies that the task can have only two values.
 */
export interface taskInterface {
  task: 'Regression' | 'Classification';
}

/**
 * Used by FileUpload.tsx to decide the file type.
 * It uses enum which specifies that the file can have only two values.
 */
export interface fileInterface {
  callback: (file: File) => void;
}

/**
 * Used by Theme.tsx to decide the theme type.
 * It uses enum which specifies that the theme can have only two values.
 */
export interface themeInterface {
  color: string;
}

/**
 * Used by Chat.tsx to decide the displaying of elements on either side of the display.
 * It uses enum which specifies that the generatedBy can have only two values.
 */
// export enum GeneratedBy {
//   user = 'user',
//   system = 'system',
// }
export interface chatInterface {
  gerneratedBy: 'user' | 'system';
  widthFull?: boolean;
}

export interface tableInterface {
  columns: (string | number)[];
  data: (string | number)[][];
  colFrom?: number;
  colTo?: number;
  rowFrom?: number;
  rowTo?: number;
}
export interface tableGroupInterface {
  df: DataFrame;
  requireColumnFilter?: boolean;
  requireRowFilter?: boolean;
}

/**
 * Used by Switch in Reusables
 */
export interface switchProps {
  switchName: string;
  isChecked?: boolean;
  callback?: (change: boolean) => any;
}

/**
 * Used by Button component in Reusables
 */
export interface buttonInterface {
  name: string;
  icon?: boolean;
  disabled?: boolean;
  conditionalDisplay?: boolean;
  iconComponent?: () => JSX.Element;
  callback?: () => any;
}

/**
 * Used by ConversationalTyping in Reusables
 */
export interface conversationalTypingInterface {
  text: string;
  speed?: number;
  callback?: () => void;
}

/**
 * Used by Alert in Reusables
 */
export interface alertInterface {
  type: 'danger' | 'note';
}

/**
 * Used by Input in Reusables
 */
export interface inputInterface {
  size: 'small' | 'large' | 'medium' | 'full';
  defaultValue: string | number;
  callback?: (e: string) => void;
}

export interface inputGroupInterface {
  label: string;
}
