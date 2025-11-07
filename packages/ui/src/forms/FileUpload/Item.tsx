import { ComponentProps, PropsWithChildren, useId, useMemo } from 'react';
import { FileProvider, useFileProvider, useFilesProvider } from './context';
import { Text } from '../../typography';
import { XBox, YBox } from '../../layout';
import { match } from 'ts-pattern';
import {
  FileJpeg,
  FileJpg,
  FilePdf,
  FilePng,
  FileUnknown,
  Trash01,
} from '@crossed/icons';
import { Pressable } from 'react-native';

const sizeFormatter = new Intl.NumberFormat([], {
  style: 'unit',
  unit: 'byte',
  notation: 'compact',
  unitDisplay: 'narrow',
});

export const Items = () => {
  const { files } = useFilesProvider();
  const id = useId();
  return Array.from(files || []).map((file) => (
    <Item file={file} key={`${id}-${file.name}`}>
      <ItemIcon />
      <YBox>
        <FileName />
        <SizeText />
      </YBox>
      <Delete />
    </Item>
  ));
};

export const Item = ({
  file,
  ...props
}: ComponentProps<typeof XBox> & { file: File }) => {
  return (
    <FileProvider file={file}>
      <XBox {...props} />
    </FileProvider>
  );
};
Item.displayName = 'FileUpload.Item';

export const FileName = (
  props: Omit<ComponentProps<typeof Text>, 'children'>
) => {
  const { file } = useFileProvider();
  return (
    <Text color={'secondary'} fontSize={'sm'} fontWeight={'medium'} {...props}>
      {file.name}
    </Text>
  );
};
FileName.displayName = 'FileUpload.ItemFileName';

export const SizeText = (
  props: Omit<ComponentProps<typeof Text>, 'children'>
) => {
  const { file } = useFileProvider();
  return (
    <Text color={'secondary'} fontSize={'sm'} {...props}>
      {sizeFormatter.format(file.size)}
    </Text>
  );
};
SizeText.displayName = 'FileUpload.ItemSizeText';

export const Delete = (
  props: Omit<ComponentProps<typeof Text>, 'children'>
) => {
  const { setFiles, files } = useFilesProvider();
  const { file } = useFileProvider();
  return (
    <Pressable
      onPress={() => {
        setFiles(files.filter((f) => f.name !== file.name));
      }}
    >
      <Trash01 />
    </Pressable>
  );
};
SizeText.displayName = 'FileUpload.ItemSizeText';

export const ItemIcon = () => {
  const { file } = useFileProvider();
  console.log(file);
  const extension = useMemo(() => {
    const splitFile = file.name.split('.');
    return splitFile[splitFile.length - 1];
  }, [file.name]);
  const Icon = match(extension)
    .with('pdf', () => FilePdf)
    .with('png', () => FilePng)
    .with('jpg', () => FileJpg)
    .with('jpeg', () => FileJpeg)
    .otherwise(() => FileUnknown);
  return <Icon size={40} color={'border.primary.default'} />;
};
