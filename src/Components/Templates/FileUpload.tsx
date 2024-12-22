import React, { useReducer, useCallback, useContext } from 'react';
import {
  Button,
  // Alert,
  ConversationTyping,
  FileInput,
  HorizontalRule,
  Input,
  Switch,
} from '../Reusables';
import { ChatContext } from '../Context';
import { Chat } from '../Chat';
import { FileUploadAck } from './FileUploadAck';

const fileUploadReducer = (
  state: {
    complete: boolean;
    delimiter: string;
    header: boolean;
    file: File | null;
  },
  payload: { action: string; value: any }
) => {
  switch (payload.action) {
    case 'setComplete':
      return { ...state, complete: payload.value };
    case 'setDelimeter':
      return { ...state, delimiter: payload.value };
    case 'setHeader':
      return { ...state, header: payload.value };
    case 'setFile':
      return { ...state, file: payload.value };
    default:
      return state;
  }
};

export const FileUpload: React.FC = React.memo(() => {
  const { appendChatComponent } = useContext(ChatContext);
  const [state, dispatch] = useReducer(fileUploadReducer, {
    complete: false,
    delimiter: ',',
    header: false,
    file: null,
  });
  const setFile = useCallback((file: File) => {
    dispatch({ action: 'setFile', value: file });
  }, []);

  const setSwitch = useCallback((header: boolean) => {
    dispatch({ action: 'setHeader', value: header });
  }, []);

  return (
    <div className="flex-col leading-7 text-sm sm:text-md">
      <ConversationTyping
        text={`
            <span class='font-bold text-md sm:text-lg'>Before we can proceed can you upload your csv file</span>
            <br>
            Let’s get started! Type your question or request, and we'll help you navigate through the world of machine learning. 
            Feel free to ask about anything—from basic concepts to complex models. ✨
            </p>          
`}
        callback={() => dispatch({ action: 'setComplete', value: true })}
      />
      {state.complete && (
        <div>
          <HorizontalRule />
          <div className="flex flex-wrap items-center justify-evenly mt-3">
            <FileInput callback={setFile} />
            <span className="flex items-center">
              <span className="mr-2">Delimeter</span>
              <Input size="small" defaultValue={state.delimiter} />
            </span>
            <span className="flex items-center ">
              <span className="mr-2">Header</span>
              <Switch switchName="Header" callback={setSwitch} />
            </span>
            <Button
              icon={false}
              name="submit"
              disabled={state.file == null ? true : false}
              callback={() =>
                appendChatComponent(
                  <Chat gerneratedBy="user">
                    <FileUploadAck
                      file={state.file}
                      header={state.header}
                      delimeter={state.delimiter}
                    />
                  </Chat>
                )
              }
            />
          </div>
        </div>
      )}
    </div>
  );
});

FileUpload.displayName = 'FileUpload';
