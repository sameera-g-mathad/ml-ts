import React, { createContext, useReducer } from 'react';
import { childrenProp, chatInterfaceByContext } from '../../interface';
import { WelcomeText } from '../Templates';
import { Chat } from '../Chat';

export const ChatContext = createContext<chatInterfaceByContext>({
  chatComponents: [],
  task: 'Regression',
  appendChatComponent: () => {},
  updateTask: () => {},
  updateTaskAndAppendChat: () => {},
});

const chatContextReducer = (
  state: any,
  payload: { action: string; value: any }
) => {
  switch (payload.action) {
    case 'appendChatComponent':
      return {
        ...state,
        chatComponents: [...state.chatComponents, payload.value],
      };
    case 'updateTask':
      return { ...state, task: payload.value };
    case 'updateTaskAndAppendChat':
      return {
        ...state,
        task: payload.value[0],
        chatComponents: [...state.chatComponents, payload.value[1]],
      };
    default:
      return state;
  }
};

export const ChatContextProvider: React.FC<childrenProp> = ({ children }) => {
  const [state, dispatch] = useReducer(chatContextReducer, {
    chatComponents: [
      <Chat key={1} gerneratedBy="system">
        <WelcomeText />
      </Chat>,
    ],
    task: '',
  });

  const updateTaskAndAppendChat = (task: string, Component: JSX.Element) => {
    dispatch({
      action: 'updateTaskAndAppendChat',
      value: [
        task,
        React.cloneElement(Component, {
          key: state.chatComponents.length + 1,
        }),
      ],
    });
  };
  const updateTask = (task: string) => {
    dispatch({ action: 'updateTask', value: task });
  };
  const appendChatComponent = (Component: JSX.Element) => {
    dispatch({
      action: 'appendChatComponent',
      value: React.cloneElement(Component, {
        key: state.chatComponents.length + 1,
      }),
    });
    // setChatComponents((prevChatComponents) => [
    //   ...prevChatComponents,
    //   React.cloneElement(Component, { key: chatComponents.length + 1 }),
    // ]);
  };
  return (
    <ChatContext.Provider
      value={{
        ...state,
        appendChatComponent,
        updateTaskAndAppendChat,
        updateTask,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

ChatContextProvider.displayName = 'ChatContextProvider';
