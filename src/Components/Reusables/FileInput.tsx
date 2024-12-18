import React, { ChangeEvent, useContext, useState } from 'react';
import { ThemeContext } from '../Context';
import { UploadSvg } from '../Svgs';
export const FileInput: React.FC = () => {
  const { useColor } = useContext(ThemeContext);
  const [fileName, setFileName] = useState('');
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setFileName(file.name);
  };
  return (
    <div className="mt-2">
      <input
        className="hidden"
        type="file"
        accept=".csv"
        id="file-input"
        onChange={handleChange}
      />
      <div className="flex justify-between items-center w-48">
        <label
          style={{
            ...({ '--use-color': useColor } as React.CSSProperties),
          }}
          className="file-input border-2 flex items-center justify-evenly px-3 rounded-lg py-2 "
          htmlFor="file-input"
        >
          <UploadSvg />
          Choose file
        </label>
        <span className="py-2 text-md">{fileName}</span>
      </div>
    </div>
  );
};

FileInput.displayName = 'FileInput';
