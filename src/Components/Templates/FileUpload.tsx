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
    submitStatus: boolean;
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

    case 'setSubmitStatus': return { ...state, submitStatus: payload.value }
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
    submitStatus: true
  });
  const setFile = useCallback((file: File) => {
    dispatch({ action: 'setFile', value: file });
  }, []);

  const setSwitch = useCallback((header: boolean) => {
    dispatch({ action: 'setHeader', value: header });
  }, []);

  const setSubmitStatus = useCallback((status: boolean) => {
    dispatch({ action: 'setSubmitStatus', value: status });
  }, []);

  return (
    <div className="flex-col leading-7 text-sm sm:text-md">
      <ConversationTyping
        text={`
          <div>
            <p>Please ensure the following before uploading your CSV file:</p>
          <ul class="list-inside list-disc ml-4">
            <li>The target variable should be placed in the last column.</li>
            <li>The last column (target variable) must be label encoded.</li>
            <li>Standardization, normalization, and categorical encoding are not handled by the website, so make sure your data is preprocessed accordingly.</li>
          </ul>
          <p>These requirements are expected to remain, though additional features may be added in the future.</p>
          </div>
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
              name="Submit"
              disabled={!state.file || !state.submitStatus ? true : false}
              callback={() => {
                setSubmitStatus(false);
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
              }
            />
          </div>
        </div>
      )}
    </div>
  );
});

FileUpload.displayName = 'FileUpload';
