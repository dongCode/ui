import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { Field } from '../Field';
import FromItemStyle from './FromItemStyle';
export type FormItemProps = React.ComponentProps<typeof Field> & {
  /**
   * 表单标签
   */
  label?: string;
  /**
   * 单位
   */
  unit?: string;
  /**
   * 自定义组件
   */
  comp?: Element;
  /**
   * 对应后端字段名字
   */
  name?: string;
  /**
   * 输入框字体颜色
   */
  textColor?: string;
  /**
   * 单位样式
   */
  unitStyles?: StyleProp<TextStyle>;
  /**
   * 标签样式
   */
  labelStyles?: StyleProp<TextStyle>;
  /**
   * 最外层View样式
   */
  containerStyles?: StyleProp<ViewStyle>;
  /**
   * 自定义单位组件
   */
  unitComp?: Element;
};
export function FormItem(props: FormItemProps) {
  const {
    label,
    unit,
    comp,
    unitStyles,
    labelStyles,
    containerStyles,
    unitComp,
    ...fieldProps
  } = props;
  return (
    <View style={StyleSheet.flatten([FromItemStyle.titleBox, containerStyles])}>
      {label ? (
        <Text style={StyleSheet.flatten([FromItemStyle.label, labelStyles])}>
          {label}
        </Text>
      ) : null}
      <View style={FromItemStyle.compContainer}>
        {comp ? comp : <Field {...fieldProps} />}
      </View>
      {unit ? <Text style={unitStyles}>{unit}</Text> : null}
      {unitComp}
    </View>
  );
}

export default FormItem;
