import { withTheme } from '../config';
import { Overlay, OverlayProps } from '@dplus/base/dist/Overlay/Overlay';

export { Overlay };
export type { OverlayProps };
export default withTheme<OverlayProps>(Overlay, 'Overlay');
