import { withTheme } from '../config';
import { Rating, SwipeRatingProps } from '@dplus/base/dist/Rating/Rating';

export { Rating };
export type { SwipeRatingProps };
export default withTheme(Rating, 'Rating');
