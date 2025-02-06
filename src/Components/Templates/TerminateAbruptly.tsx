import React from 'react';
import { ConversationTyping } from '../Reusables';

export const TerminateAbruptly: React.FC = () => {
  return (
    <div>
      <ConversationTyping
        text={`It appears that the dataset contains values that are not suitable for processing. This may include categorical values, null values, or garbage data that are being treated as strings. 
            Currently, the website is not capable of handling such data.</p>
            <p>Please ensure your dataset is cleaned and free from any categorical or non-numeric values. Feel free to upload the corrected dataset at any time.</p>`}
      />
    </div>
  );
};

TerminateAbruptly.displayName = 'TerminateAbruptly';
