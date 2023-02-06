import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

export interface FromItemStyle {
  titleBox: ViewStyle;
  label: TextStyle;
  // 自定义组件样式
  compContainer: ViewStyle;
}

export default StyleSheet.create<FromItemStyle>({
  titleBox: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  label: {
    width: 100,
  },
  compContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
