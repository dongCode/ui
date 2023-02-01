import { withTheme } from '../config';
import {
  PricingCard,
  PricingCardProps,
} from '@dplus/base/dist/PricingCard/PricingCard';

export { PricingCard };
export type { PricingCardProps };
export default withTheme<PricingCardProps>(PricingCard, 'PricingCard');
