import React from 'react';
import {
  // Alert,
  // Button,
  ConversationTyping,
  FileInput,
  HorizontalRule,
} from '../Reusables';
export const FileUpload: React.FC = React.memo(() => {
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
      />
      <HorizontalRule />
      <FileInput />
    </div>
  );
});

FileUpload.displayName = 'FileUpload';
