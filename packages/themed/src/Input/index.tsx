import { withTheme } from '../config';
import { Input, InputProps } from '@dplus/base/dist/Input/Input';

export { Input };
export type { InputProps };
export default withTheme<InputProps>(Input, 'Input');
