import { withTheme } from '../config';
import { Tooltip, TooltipProps } from '@dplus/base/dist/Tooltip/Tooltip';

export { Tooltip };
export type { TooltipProps };
export default withTheme<TooltipProps>(Tooltip, 'Tooltip');
