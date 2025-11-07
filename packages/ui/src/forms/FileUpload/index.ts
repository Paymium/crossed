import { withStaticProperties } from '@crossed/core';
import { Root } from './Root';
import { Icon } from './Icon';
import { Label } from './Label';
import { HelperText } from './HelperText';
import { Items } from './Item';
import { DropZone } from './DropZone';

export const FileUpload = withStaticProperties(Root, {
  Icon,
  Label,
  HelperText,
  Items,
  Dropzone: DropZone
});
