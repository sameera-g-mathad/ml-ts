import React, { useCallback, useReducer } from 'react';
import {
  Button,
  ConditionalDisplay,
  ConversationTyping,
  FileInput,
  Input,
  InputGroup,
  Switch,
} from '../Reusables';
import { Chat } from '../Components/Chat';
import { FileUploadAck } from './index';
import { withContext } from '../HOC';
import { consumeContextInterface } from '../interface';

// Reducer function to manage the state of the FileUpload component.
// It handles actions to set the completion status, delimiter, header, and file.
const fileUploadReducer = (
  state: {
    complete: boolean;
    delimiter: string;
    header: boolean;
    file: File | null;
    // submitStatus: boolean;
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

/**
 * Template - 4
 * FileUpload component is responsible for displaying a typing animation
 * and then rendering the file upload form based on the user's input.
 *
 * @param {consumeContextInterface} props - The context interface for the component.
 * @returns {JSX.Element} - The rendered component. 
 */
const FileUploadComponent: React.FC<consumeContextInterface> = React.memo(({ appendChatComponent }) => {
  const [state, dispatch] = useReducer(fileUploadReducer, {
    complete: false,
    delimiter: ',',
    header: false,
    file: null,
  });
  // console.log('FileUpload')

  // Callback functions to update the state based on user input.
  const setDelimeter = useCallback((delimiter: string) => {
    dispatch({ action: 'setDelimeter', value: delimiter })
  }, []);
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
        <ConditionalDisplay>
          <div className="flex flex-wrap items-center justify-evenly mt-3">
            <FileInput callback={setFile} />
            <InputGroup label='Delimeter'>
              <Input size="small" defaultValue={state.delimiter} callback={setDelimeter} />
            </InputGroup>
            <InputGroup label='Header'>
              <Switch switchName="Header" callback={setSwitch} />
            </InputGroup>
            <Button
              icon={false}
              name="Submit"
              callback={() => {
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
        </ConditionalDisplay>
      )}
    </div>
  );
});

FileUploadComponent.displayName = 'FileUploadComponent';

export const FileUpload = withContext(FileUploadComponent, ['appendChatComponent'])
