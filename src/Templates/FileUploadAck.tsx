import React, { memo, useEffect } from 'react';
import { fr } from '../ml-ts/frame';
import { ConversationTyping } from '../Reusables';
import { Chat } from '../Components/Chat';
import { DisplayDf, FilterColumnsPrompt } from './index';
import { withContext } from '../HOC';
import { consumeContextInterface } from '../interface';
export interface fileUploadAckInterface {
  file: File;
  header: boolean;
  delimeter: string;
}
const FileUploadAckComponent: React.FC<fileUploadAckInterface & consumeContextInterface> = memo(
  ({ file, header, delimeter, addDataframe, appendChatComponent }) => {
    // console.log('FileUploadAck')
    useEffect(() => {
      async function readFile() {
        const df = await fr.read(file, header, delimeter);
        addDataframe(df);
      }
      readFile();
      // eslint-disable-next-line
    }, []);

    return (
      <ConversationTyping
        text={`Please read the <b>'${file.name
          }'</b> with the delimiter of <b>'${delimeter}'</b> and the file <b>${header ? 'does have a header' : "doesn't have a header"
          } </b>`}
        callback={() =>
          appendChatComponent(
            <Chat gerneratedBy="system" widthFull={true}>
              <DisplayDf componentAfterInfo={<FilterColumnsPrompt />} />
            </Chat>
          )
        }
      />
    );
  }
);

FileUploadAckComponent.displayName = 'FileUploadAckComponent';

export const FileUploadAck = withContext(FileUploadAckComponent, ['addDataframe', 'appendChatComponent'])