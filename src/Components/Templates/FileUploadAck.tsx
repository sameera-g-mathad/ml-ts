import React, { memo, useContext, useEffect } from 'react';
import { fr } from '../../ml-ts/frame';
import { ConversationTyping } from '../Reusables';
import { ChatContext } from '../Context';
import { Chat } from '../Chat';
import { DisplayDf } from './DisplayDf';
export interface fileUploadAckInterface {
  file: File;
  header: boolean;
  delimeter: string;
}
export const FileUploadAck: React.FC<fileUploadAckInterface> = memo(
  ({ file, header, delimeter }) => {
    const { addDataframe, appendChatComponent } = useContext(ChatContext);

    useEffect(() => {
      fr.read(file, header, delimeter).then((data) => addDataframe(data));
      // eslint-disable-next-line
    }, []);
    return (
      <ConversationTyping
        text={`Please read the <b>'${
          file.name
        }'</b> with the delimiter of <b>'${delimeter}'</b> and the file <b>${
          header ? 'does have a header' : "doesn't have a header"
        } </b>`}
        callback={() =>
          appendChatComponent(
            <Chat gerneratedBy="system" widthFull={true}>
              <DisplayDf key={new Date().getTime()} />
            </Chat>
          )
        }
      />
    );
  }
);

FileUploadAck.displayName = 'FileUploadAck';
