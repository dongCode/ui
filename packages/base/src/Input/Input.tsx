import React from 'react';
import {
  Text,
  View,
  TextInput,
  Platform,
  StyleSheet,
  ViewStyle,
  StyleProp,
  TextStyle,
  TextInputProps,
  Keyboard,
  EmitterSubscription,
} from 'react-native';
import { renderNode, patchWebProps, defaultTheme, Theme } from '../helpers';
import { fonts } from '../helpers';
import { Icon, IconNode } from '../Icon';
import styles from './InputStyles';

const renderText = (content: any, defaultProps: any, style: StyleProp<any>) =>
  renderNode(Text, content, {
    ...defaultProps,
    style: StyleSheet.flatten([style, defaultProps && defaultProps.style]),
  });

export interface InputProps
  extends React.ComponentPropsWithRef<typeof TextInput> {
  /**
   * 最外层View Style
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * 禁止输入
   */
  disabled?: boolean;
  /**
   * 禁止输入后的样式
   */
  disabledInputStyle?: StyleProp<TextStyle>;
  /**
   * 显示左侧Icon图标
   */
  leftIcon?: IconNode;
  /**
   * 包裹左侧Icon图标外层View样式
   */
  leftIconContainerStyle?: StyleProp<ViewStyle>;
  /**
   * 显示右侧Icon图标
   */
  rightIcon?: IconNode;
  /**
   * 包裹右侧Icon图标外层View样式
   */
  rightIconContainerStyle?: StyleProp<ViewStyle>;
  /**
   * 暂无用处
   */
  inputContainerStyle?: StyleProp<ViewStyle>;
  /**
  /**
   * TextInput输入框样式
   */
  inputStyle?: StyleProp<TextStyle>;
  /**
   *  可替换默认提供的 TextInput
   * @type React Component
   */
  InputComponent?: React.ComponentType | React.ForwardRefExoticComponent<any>;
  /**
   * 错误提示信息Props
   */
  errorProps?: object;
  /**
   * 错误提示信息样式
   */
  errorStyle?: StyleProp<TextStyle>;
  /**
   * 错误提示信息
   */
  errorMessage?: string;
  /**
   * 组件label 暂无用处
   */
  label?: string | React.ReactNode;
  /**
   * label 样式
   */
  labelStyle?: StyleProp<TextStyle>;
  /**
   * label Props
   */
  labelProps?: object;
  /**
   * 是否显示错误信息
   */
  renderErrorMessage?: boolean;
}

export class Input extends React.Component<InputProps & { theme?: Theme }> {
  static displayName = 'Input';
  keyboardDidHideListener: EmitterSubscription;
  constructor(props: InputProps) {
    super(props);

    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide
    );
  }

  componentWillUnmount() {
    this.keyboardDidHideListener.remove();
  }

  keyboardDidHide = () => {
    this.input.blur();
  };
  input: any;

  focus(): void {
    this.input.focus();
  }

  blur(): void {
    this.input.blur();
  }

  clear(): void {
    this.input.clear();
  }

  isFocused(): boolean {
    return this.input.isFocused();
  }

  setNativeProps(nativeProps: Partial<TextInputProps>): void {
    this.input.setNativeProps(nativeProps);
  }

  render() {
    const {
      containerStyle,
      disabled,
      disabledInputStyle,
      leftIcon,
      leftIconContainerStyle,
      rightIcon,
      rightIconContainerStyle,
      InputComponent = TextInput,
      inputStyle,
      errorProps,
      errorStyle,
      errorMessage,
      label,
      labelStyle,
      labelProps,
      theme = defaultTheme,
      renderErrorMessage = true,
      style,
      ...attributes
    } = this.props;

    const hideErrorMessage = !renderErrorMessage && !errorMessage;

    return (
      <View
        testID="RNE__Input__view-wrapper"
        style={StyleSheet.flatten([styles.container, containerStyle])}
      >
        {renderText(
          label,
          { style: labelStyle, ...labelProps },
          {
            fontSize: 16,
            color: theme?.colors?.grey3,
            ...Platform.select({
              android: {
                ...fonts.android.bold,
              },
              default: {
                fontWeight: 'bold',
              },
            }),
          }
        )}

        {leftIcon && (
          <View
            style={StyleSheet.flatten([
              styles.iconContainer,
              leftIconContainerStyle,
            ])}
          >
            {renderNode(Icon, leftIcon)}
          </View>
        )}

        <InputComponent
          testID="RNE__Input__text-input"
          underlineColorAndroid="transparent"
          editable={!disabled}
          ref={(ref: any) => {
            this.input = ref;
          }}
          style={StyleSheet.flatten([
            {
              color: theme?.colors?.black,
            },
            styles.input,
            inputStyle,
            disabled && styles.disabledInput,
            disabled && disabledInputStyle,
            style,
          ])}
          placeholderTextColor={theme?.colors?.grey3}
          {...patchWebProps(attributes)}
          value={attributes.value?.toString()}
        />

        {rightIcon && (
          <View
            style={StyleSheet.flatten([
              styles.iconContainer,
              rightIconContainerStyle,
            ])}
          >
            {renderNode(Icon, rightIcon)}
          </View>
        )}
        {errorMessage && (
          <Text
            {...errorProps}
            style={StyleSheet.flatten([
              {
                margin: 5,
                fontSize: 12,
                color: theme?.colors?.error,
              },
              errorStyle && errorStyle,
              hideErrorMessage && {
                height: 0,
                margin: 0,
                padding: 0,
              },
            ])}
          >
            {errorMessage}
          </Text>
        )}
      </View>
    );
  }
}
