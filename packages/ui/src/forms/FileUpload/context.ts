import { createScope } from '@crossed/core';
import { RefObject } from 'react';

type FilesContext = {
  files: File[];
  setFiles: (files: File[]) => void;
};
type Context = {
  isDragging: boolean;
  setIsDragging: (d: boolean) => void;
  inputRef: RefObject<HTMLInputElement>;
};
type FileContext = { file: File };
export const [FileUploadProvider, useFileUploadProvider] = createScope<Context>(
  {} as Context
);
export const [FilesProvider, useFilesProvider] = createScope<FilesContext>(
  {} as FilesContext
);
export const [FileProvider, useFileProvider] = createScope<{ file: File }>(
  {} as FileContext
);
