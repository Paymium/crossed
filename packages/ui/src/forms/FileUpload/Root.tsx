import { ComponentProps, useRef, useState } from 'react';
import { isWeb } from '@crossed/styled';
import { VisibilityHidden } from '../../other';
import { useUncontrolled } from '@crossed/core';
import { FilesProvider, FileUploadProvider } from './context';
import { YBox } from '../../layout';

export const Root = ({
  children,
  multiple,
  ...props
}: ComponentProps<typeof YBox> & {
  multiple?: boolean;
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useUncontrolled<File[]>({});

  return (
    <FileUploadProvider
      inputRef={inputRef}
      isDragging={isDragging}
      setIsDragging={setIsDragging}
    >
      <FilesProvider files={files} setFiles={setFiles}>
        <YBox {...props}>
          {isWeb && (
            <VisibilityHidden hide>
              <input
                type={'file'}
                ref={inputRef}
                multiple={multiple}
                onChange={(e) => {
                  setFiles(Array.from(e.target.files));
                }}
              />
            </VisibilityHidden>
          )}
          {children}
        </YBox>
      </FilesProvider>
    </FileUploadProvider>
  );
};
Root.displayName = 'FileUpload';
