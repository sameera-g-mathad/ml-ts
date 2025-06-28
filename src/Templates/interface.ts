export interface displayDfInterface {
  componentAfterInfo: React.ReactNode;
}

export interface displayDfInfoInterface {
  componentAfterInfo: React.ReactNode;
}

export interface fileUploadAckInterface {
  file: File;
  header: boolean;
  delimeter: string;
}

/**
 * Used by Task.tsx to decide the task type.
 * It uses enum which specifies that the task can have only two values.
 */
export interface taskInterface {
  task: 'Regression' | 'Classification';
}

export interface systemPromptInterface {
  systemMessage: string;
  renderInterface: systemPromptRenderType;
}

export interface systemPromptAckInterface {
  message: string;
  renderComponent: React.ReactNode;
}

export interface fillNaColumnInterface {
  column: string;
  callback: (obj: fillNaReducerType) => void;
}

// Types

export type systemPromptRenderType = {
  yes: systemPromptAckInterface;
  no: systemPromptAckInterface;
};

export type fillNaType = fillNaReducerType & {
  column: string;
};

export type fillNaReducerType = {
  dtype: string;
  isFill: boolean;
  value: string;
  imputeType: 'max' | 'min' | 'mean' | 'median';
};

export type fillNaReducerActionType =
  | { action: 'setDtype'; value: string }
  | { action: 'setIsFill' }
  | { action: 'setValue'; value: string }
  | { action: 'setImputeType'; value: 'max' | 'min' | 'mean' | 'median' };
