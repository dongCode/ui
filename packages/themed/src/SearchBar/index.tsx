import { withTheme } from '../config';
import {
  SearchBar,
  SearchBarProps,
} from '@dplus/base/dist/SearchBar/SearchBar';
import { SearchBarAndroidProps } from '@dplus/base/dist/SearchBar/SearchBar-android';
import { SearchBarIosProps } from '@dplus/base/dist/SearchBar/SearchBar-ios';
import { SearchBarDefaultProps } from '@dplus/base/dist/SearchBar/SearchBar-default';

export { SearchBar };
export type {
  SearchBarProps,
  SearchBarAndroidProps,
  SearchBarDefaultProps,
  SearchBarIosProps,
};

export default withTheme<SearchBarProps>(SearchBar, 'SearchBar');
