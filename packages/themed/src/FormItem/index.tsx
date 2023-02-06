import { withTheme } from '../config';
import { FormItem, FormItemProps } from '@dplus/base/dist/FormItem/FormItem';

export type { FormItemProps };

export const ThemedFormItem = Object.assign(withTheme(FormItem, 'FormItem'), {
  Item: withTheme<FormItemProps>(FormItem, 'FormItem'),
});

export default ThemedFormItem;
