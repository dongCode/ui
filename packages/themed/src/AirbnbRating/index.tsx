import { withTheme } from '../config';
import {
  AirbnbRating,
  TapRatingProps,
} from '@dplus/base/dist/AirbnbRating/index';

export { AirbnbRating };
export type { TapRatingProps };
export const AirbnbRatingDefault = withTheme(AirbnbRating, 'AirbnbRating');
