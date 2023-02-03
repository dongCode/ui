import Color from 'color';
import React, { useCallback, useEffect, useMemo } from 'react';
import {
  ActivityIndicator,
  ActivityIndicatorProps,
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableNativeFeedback,
  TouchableNativeFeedbackProps,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import {
  color,
  defaultTheme,
  renderNode,
  Theme,
  StringOmit,
  RneFunctionComponent,
  ThemeSpacing,
} from '../helpers';
import { IconNode, Icon } from '../Icon';
import { TextProps } from '../Text';

const defaultLoadingProps = (
  type: 'solid' | 'clear' | 'outline',
  theme: Theme
): ActivityIndicatorProps => ({
  color: type === 'solid' ? 'white' : theme?.colors?.primary,
  size: 'small',
});

const positionStyle = {
  top: 'column',
  bottom: 'column-reverse',
  left: 'row',
  right: 'row-reverse',
};

export interface ButtonProps
  extends TouchableOpacityProps,
    TouchableNativeFeedbackProps {
  /** 文字 */
  title?: string | React.ReactElement<{}>;

  /** 包裹文字组件Text样式 */
  titleStyle?: StyleProp<TextStyle>;

  /** 包裹文字Text属性 */
  titleProps?: TextProps;

  /** 自定义按钮样式 */
  buttonStyle?: StyleProp<ViewStyle>;

  /** 显示按钮类型 solid默认值 clear文字按钮 outline 仅显示边框  */
  type?: 'solid' | 'clear' | 'outline';

  /** 加载提示 */
  loading?: boolean;

  /** 加载View样式 */
  loadingStyle?: StyleProp<ViewStyle>;

  /** 加载View属性  */
  loadingProps?: ActivityIndicatorProps;

  /** 最外层View样式 */
  containerStyle?: StyleProp<ViewStyle>;

  /** 图标 */
  icon?: IconNode;

  /** 包裹图标的View样式 */
  iconContainerStyle?: StyleProp<ViewStyle>;

  /**  按钮显示在右边，需要配合icon属性使用 */
  iconRight?: boolean;

  /** 渐进样式 详情 [用法](#linear-gradient). */
  linearGradientProps?: object;

  /** 用户交互组件 默认TouchableOpacity，会根据ios android平台调整*/
  TouchableComponent?: typeof React.Component;

  /** 默认值 View 与 linearGradientProps 配合使用 */
  ViewComponent?: typeof React.Component;

  /** 禁用 */
  disabled?: boolean;

  /** 禁用样式 */
  disabledStyle?: StyleProp<ViewStyle>;

  /** 禁用文字样式 */
  disabledTitleStyle?: StyleProp<TextStyle>;

  /** Add raised button styling (optional). Has no effect if `type="clear"`. */
  raised?: boolean;

  /** 定义图标显示位置 */
  iconPosition?: 'left' | 'right' | 'top' | 'bottom';

  /** 文字大写  */
  uppercase?: boolean;

  /** 按钮 radius
   * @type   number | sm | md | lg
   */
  radius?: number | StringOmit<keyof ThemeSpacing>;

  /** 大小 */
  size?: 'sm' | 'md' | 'lg';

  /**
   * 颜色
   * @type   string | primary | secondary | success | warning | error
   */
  color?: StringOmit<'primary' | 'secondary' | 'success' | 'error' | 'warning'>;
}

export const Button: RneFunctionComponent<ButtonProps> = ({
  TouchableComponent,
  containerStyle,
  onPress = () => {},
  buttonStyle,
  type = 'solid',
  loading = false,
  loadingStyle,
  loadingProps: passedLoadingProps,
  size = 'md',
  radius = 'xs',
  uppercase = false,
  color: buttonColor = 'primary',
  title = '',
  titleProps,
  titleStyle: passedTitleStyle,
  icon,
  iconContainerStyle,
  iconRight = false,
  disabled = false,
  disabledStyle,
  disabledTitleStyle,
  raised = false,
  linearGradientProps,
  ViewComponent = View,
  theme = defaultTheme,
  iconPosition = 'left',
  children = title,
  ...rest
}) => {
  useEffect(() => {
    if (linearGradientProps && !ViewComponent) {
      console.warn(
        "You need to pass a ViewComponent to use linearGradientProps !\nExample: ViewComponent={require('react-native-linear-gradient')}"
      );
    }
  });

  const handleOnPress = useCallback(
    (evt) => {
      if (!loading && !disabled) {
        onPress(evt);
      }
    },
    [loading, onPress, disabled]
  );

  // Refactor to Pressable
  const TouchableComponentInternal =
    TouchableComponent ||
    Platform.select({
      android: linearGradientProps ? TouchableOpacity : TouchableNativeFeedback,
      default: TouchableOpacity,
    });

  const titleStyle: StyleProp<TextStyle> = useMemo(
    () =>
      StyleSheet.flatten([
        {
          color: type === 'solid' ? 'white' : theme?.colors?.primary,
        },
        uppercase && { textTransform: 'uppercase' },
        styles.title,
        passedTitleStyle,
        disabled && {
          color: color(theme?.colors?.disabled).darken(0.3).string(),
        },
        disabled && disabledTitleStyle,
      ]),
    [
      disabled,
      disabledTitleStyle,
      passedTitleStyle,
      theme?.colors?.disabled,
      theme?.colors?.primary,
      type,
      uppercase,
    ]
  );

  const background =
    Platform.OS === 'android' && Platform.Version >= 21
      ? TouchableNativeFeedback.Ripple(
          Color(titleStyle?.color?.toString()).alpha(0.32).rgb().string(),
          false
        )
      : undefined;

  const loadingProps: ActivityIndicatorProps = useMemo(
    () => ({
      ...defaultLoadingProps(type, theme),
      ...passedLoadingProps,
    }),
    [passedLoadingProps, theme, type]
  );

  const accessibilityState = useMemo(
    () => ({
      disabled: !!disabled,
      busy: !!loading,
    }),
    [disabled, loading]
  );

  const borderRadius = useMemo(
    () =>
      Number(
        theme.spacing[radius as keyof typeof theme.spacing] ?? (radius || '0')
      ) || 0,
    [radius, theme]
  );

  return (
    <View
      style={[
        styles.container,
        { borderRadius },
        containerStyle,
        raised && !disabled && type !== 'clear' && styles.raised,
      ]}
      testID="RNE_BUTTON_WRAPPER"
    >
      <TouchableComponentInternal
        onPress={handleOnPress}
        delayPressIn={0}
        activeOpacity={0.3}
        accessibilityRole="button"
        accessibilityState={accessibilityState}
        disabled={disabled}
        background={background}
        {...rest}
      >
        <ViewComponent
          {...linearGradientProps}
          style={StyleSheet.flatten([
            styles.button,
            {
              padding: theme.spacing[size],
              paddingHorizontal: theme.spacing[size] + 2,
              borderRadius,
              // flex direction based on iconPosition
              // if iconRight is true, default to right
              flexDirection:
                positionStyle[iconRight ? 'right' : iconPosition] || 'row',
              backgroundColor:
                type === 'solid'
                  ? theme.colors[buttonColor as PropertyKey] ||
                    buttonColor ||
                    theme?.colors?.primary
                  : 'transparent',
              borderColor: theme?.colors?.primary,
              borderWidth: type === 'outline' ? StyleSheet.hairlineWidth : 0,
            },
            buttonStyle,
            disabled &&
              type === 'solid' && {
                backgroundColor: theme?.colors?.disabled,
              },
            disabled &&
              type === 'outline' && {
                borderColor: color(theme?.colors?.disabled)
                  .darken(0.3)
                  .string(),
              },
            disabled && disabledStyle,
          ])}
        >
          {/* Activity Indicator on loading */}
          {loading && (
            <ActivityIndicator
              style={StyleSheet.flatten([styles.loading, loadingStyle])}
              color={loadingProps.color}
              size={loadingProps.size}
              {...loadingProps}
            />
          )}
          {/* Button Icon, hide Icon while loading */}
          {!loading &&
            icon &&
            renderNode(Icon, icon, {
              containerStyle: StyleSheet.flatten([
                styles.iconContainer,
                iconContainerStyle,
              ]),
            })}
          {/* Title for Button, hide while loading */}
          {!loading &&
            React.Children.toArray(children).map((child, index) => (
              <React.Fragment key={index}>
                {typeof child === 'string'
                  ? renderNode(Text, child, {
                      style: {
                        ...titleStyle,
                      },
                      ...titleProps,
                    })
                  : child}
              </React.Fragment>
            ))}
        </ViewComponent>
      </TouchableComponentInternal>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: defaultTheme.spacing.md,
    paddingHorizontal: defaultTheme.spacing.lg,
  },
  container: {
    overflow: 'hidden',
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 1,
    ...Platform.select({
      android: {
        fontFamily: 'sans-serif-medium',
      },
      default: {
        fontSize: 18,
      },
    }),
  },
  iconContainer: {
    marginHorizontal: 5,
  },
  raised: {
    backgroundColor: '#fff',
    overflow: 'visible',
    ...Platform.select({
      android: {
        elevation: 4,
      },
      default: {
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
      },
    }),
  },
  loading: {
    marginVertical: 2,
  },
});

Button.displayName = 'Button';
