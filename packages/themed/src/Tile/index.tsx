import { withTheme } from '../config';
import { Tile, TileProps } from '@dplus/base/dist/Tile/Tile';
import { FeaturedTile as BaseFeaturedTile } from '@dplus/base/dist/Tile/components/FeaturedTile';

export type { TileProps };
export const FeaturedTile = withTheme<TileProps>(
  BaseFeaturedTile,
  'FeaturedTile'
);
export default withTheme<TileProps>(Tile, 'Tile');
