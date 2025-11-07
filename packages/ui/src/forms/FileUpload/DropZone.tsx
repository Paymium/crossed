import { Fragment, PropsWithChildren } from 'react';
import { composeStyles, isWeb } from '@crossed/styled';
import { useFilesProvider, useFileUploadProvider } from './context';
import { Trigger } from './Trigger';
import { baseStyle, gapStyles } from '../../styles';

export const DropZone = ({
  children,
  space,
}: PropsWithChildren<{ space?: keyof typeof gapStyles }>) => {
  const { setFiles } = useFilesProvider();
  const { setIsDragging } = useFileUploadProvider();
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };
  const onDrop = (e: any) => {
    e.preventDefault();
    setFiles(Array.from(e.dataTransfer.files));
  };

  const Wrapper = isWeb ? 'div' : Fragment;
  return (
    <Trigger>
      <Wrapper
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={onDrop}
        {...composeStyles(baseStyle.view, gapStyles[space]).style()}
      >
        {children}
      </Wrapper>
    </Trigger>
  );
};
