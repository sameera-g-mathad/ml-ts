import React, { createContext, useCallback, useReducer, useRef } from 'react';
import { childrenProp, chatInterfaceByContext } from '../interface';
import { WelcomeText } from '../Templates';
import { Chat } from '../Components/Chat';
import { DataFrame } from '../ml-ts/frame';
import { NDArray } from '../ml-ts/numts';

const dummyDataFrame = new DataFrame([], [], [0, 0], [], []);
/**
 * This is the context provider for the chat application.
 * It provides the chat components and the task to the rest of the application.
 * It uses the useReducer hook to manage the state of the chat components and task.
 * The initial state is set to an empty array of chat components and an empty task.
 */
export const ChatContext = createContext<chatInterfaceByContext>({
  chatComponents: [],
  task: 'Regression',
  df: dummyDataFrame,
  trainX: null,
  trainY: null,
  testX: null,
  testY: null,
  appendChatComponent: () => { },
  addDataframe: () => { },
  updateTask: () => { },
  updateTaskAndAppendChat: () => { },
});

/**
 * This is the reducer function for the chat context.
 * It takes the current state and an action and returns the new state.
 * The action can be to append a chat component, update the task, or add a dataframe.
 */
const chatContextReducer = (
  state: {
    chatComponents: JSX.Element[];
    task: 'Regression' | 'Classification';
    // df: DataFrame;
    trainX: NDArray | null;
    trainY: NDArray | null;
    testX: NDArray | null;
    testY: NDArray | null;
    // header: boolean;
    // delimeter: string;
  },
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
    // case 'addDataFrame':
    //   return { ...state, df: payload.value };
    default:
      return state;
  }
};


/**
 * This is the context provider for the chat application.
 * It provides the chat components and the task to the rest of the application.
 * It uses the useReducer hook to manage the state of the chat components and task.
 * The initial state is set to an empty array of chat components and an empty task.
 * 
 * 
 * @param param0 - children
 * @returns JSX.Element
 */
export const ChatContextProvider: React.FC<childrenProp> = React.memo(({ children }) => {
  const [state, dispatch] = useReducer(chatContextReducer, {
    chatComponents: [
      <Chat key={1} gerneratedBy="system">
        {/* <WelcomeText key={new Date().getTime()} />
         */}
        <WelcomeText />
      </Chat>,
    ],
    task: '',
    // df: new DataFrame([], [], [0, 0], []),
    trainX: null,
    trainY: null,
    testX: null,
    testY: null,
    // header: false,
    // delimeter: '',
  });

  const dfRef = useRef<DataFrame>(dummyDataFrame);

  /**
   * This function is used to update the task and append a chat component to the chat components array.
   * @param task - The task to be updated.
   * @param Component - The chat component to be appended.
   */
  const updateTaskAndAppendChat = useCallback((task: string, Component: JSX.Element) => {
    dispatch({
      action: 'updateTaskAndAppendChat',
      value: [
        task,
        React.cloneElement(Component, {
          key: new Date().getTime(),
        }),
      ],
    });
  }, []);

  /**
   * This function is used to add a dataframe to the state.
   * It is used to update the dataframe in the state when the file is read.
   * @param df - The dataframe to be added to the state.
   */
  const addDataframe = useCallback((df: DataFrame) => {
    dfRef.current = df;
  }, []);

  /**
   * This function is used to update the task in the state.
   * @param task - The task to be updated.
   */
  const updateTask = useCallback((task: string) => {
    dispatch({ action: 'updateTask', value: task });
  }, []);

  /**
   * This function is used to append a chat component to the chat components array.
   * @param Component - The chat component to be appended.
   */
  const appendChatComponent = useCallback((Component: JSX.Element) => {
    dispatch({
      action: 'appendChatComponent',
      value: React.cloneElement(Component, {
        key: new Date().getTime()
      }),
    });
  }, []);
  // Return the context provider with the state and functions
  return (
    <ChatContext.Provider
      value={{
        ...state,
        df: dfRef.current,
        appendChatComponent,
        addDataframe,
        updateTaskAndAppendChat,
        updateTask,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
});

ChatContextProvider.displayName = 'ChatContextProvider';
