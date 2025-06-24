import React, { ChangeEvent, useState } from 'react';
import { UploadSvg } from '../Svgs';
import { withTheme } from '../HOC';
import { fileInterface, themeInterface } from '../interface';
export const FileInputComponent: React.FC<fileInterface & themeInterface> = ({
  secondaryColor,
  callback,
}) => {
  const [fileName, setFileName] = useState('');
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setFileName(file.name);
    callback(file);
  };
  return (
    <div>
      <input
        className="hidden"
        type="file"
        accept=".csv"
        id="file-input"
        onChange={handleChange}
      />
      <div className="flex items-center">
        <label
          style={{
            ...({ '--use-color': secondaryColor } as React.CSSProperties),
          }}
          className="file-input border-2 flex items-center justify-evenly px-3 rounded-xl py-1 "
          htmlFor="file-input"
        >
          <UploadSvg />
          Choose file
        </label>
        <span className="ml-3 py-2 text-md">{fileName}</span>
      </div>
    </div>
  );
};

FileInputComponent.displayName = 'FileInputComponent';

export const FileInput = withTheme(FileInputComponent, ['secondaryColor']);
