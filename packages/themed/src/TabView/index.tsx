import { withTheme } from '../config';
import { TabViewBase, TabViewProps } from '@dplus/base/dist/TabView/TabView';
import {
  TabViewItem,
  TabViewItemProps,
} from '@dplus/base/dist/TabView/TabView.Item';

export type { TabViewProps, TabViewItemProps };

export default Object.assign(withTheme(TabViewBase, 'TabView'), {
  Item: withTheme<TabViewItemProps>(TabViewItem, 'TabViewItem'),
});
