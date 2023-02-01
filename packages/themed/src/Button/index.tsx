import { withTheme } from '../config';
import { Button, ButtonProps } from '@dplus/base/dist/Button/Button';

export { Button };
export type { ButtonProps };
export default withTheme<ButtonProps>(Button, 'Button');
