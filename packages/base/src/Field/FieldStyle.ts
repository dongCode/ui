import { StyleSheet, ViewStyle } from 'react-native';

export interface FieldStyle {
  container: ViewStyle;
  error: ViewStyle;
}

export default StyleSheet.create<FieldStyle>({
  container: {
    width: '100%',
    // textAlign: 'right', 会导致scroll滑动失效
    right: 10,
  },
  error: {
    position: 'absolute',
    bottom: -10,
  },
});
