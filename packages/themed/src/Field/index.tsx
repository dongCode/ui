import { withTheme } from '../config';
import { Field, FieldProps } from '@dplus/base/dist/Field/Field';

export type { FieldProps };

export const ThemedField = Object.assign(withTheme(Field, 'Field'), {
  Item: withTheme<FieldProps>(Field, 'Field'),
});

export default ThemedField;
