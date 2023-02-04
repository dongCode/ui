import React from 'react';
import {
  TouchableOpacity,
  Modal,
  View,
  StatusBar,
  I18nManager,
  ViewStyle,
  StyleProp,
  ColorValue,
  Platform,
  Dimensions,
  Pressable,
} from 'react-native';
import Triangle from './components/Triangle';
import { ScreenWidth, isIOS, RneFunctionComponent } from '../helpers';
import { getElementVisibleWidth } from './helpers/getTooltipCoordinate';
import { getTooltipStyle } from './helpers/getTooltipStyle';

export interface TooltipProps {
  /** 是否显示 */
  visible?: boolean;

  /** 是否显示小箭头 */
  withPointer?: boolean;

  /** 自定义弹出组件 */
  popover?: React.ReactElement<{}>;

  /** 是否支持自身控制显示隐藏 */
  toggleOnPress?: boolean;

  /** 自定义响应事件类型 */
  toggleAction?:
    | string
    | 'onPress'
    | 'onLongPress'
    | 'onPressIn'
    | 'onPressOut';

  /** 根据渲染内容，可自定义高度 */
  height?: number;

  /** 根据渲染内容，可自定义宽度 */
  width?: number;

  /** 最外层View样式 */
  containerStyle?: StyleProp<ViewStyle>;

  /** 箭头颜色默认值是 [`backgroundColor`](#backgroundcolor) */
  pointerColor?: ColorValue;

  /** 关闭时的回调函数 */
  onClose?(): void;

  /** 打开时的回调函数 */
  onOpen?(): void;

  /** 遮罩层颜色 */
  overlayColor?: ColorValue;

  /** 是否显示遮罩层 */
  withOverlay?: boolean;

  /** 设置背景颜色 */
  backgroundColor?: ColorValue;

  /** 高亮显示内容颜色 */
  highlightColor?: ColorValue;

  /** 如果嵌套在原生Modal中，需要传递 true */
  skipAndroidStatusBar?: boolean;

  /** 点击遮罩层是否关闭 */
  closeOnlyOnBackdropPress?: boolean;

  /** 覆盖Modal弹窗组件 */
  ModalComponent?: typeof React.Component;

  /** 箭头样式 */
  pointerStyle?: StyleProp<ViewStyle>;

  /** 动画样式 */
  animationType?: 'fade' | 'none';
}

/** Tooltips display informative text when users tap on an element.
 * @usage
 * ### Example
 *```tsx live
function RNETooltip() {
  const [open, setOpen] = React.useState(false);
  return (
    <Stack row align="center">
      <Tooltip
        visible={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        popover={<Text style={{color:'#fff'}}>Tooltip text</Text>}
      >
        Click me
      </Tooltip>
    </Stack>
  );
}
 * ```
 */
export const Tooltip: RneFunctionComponent<TooltipProps> = ({
  withOverlay = true,
  overlayColor = '#fafafa14',
  highlightColor = 'transparent',
  withPointer = true,
  toggleOnPress = true,
  toggleAction = 'onPress',
  height = 40,
  width = 150,
  containerStyle = {},
  backgroundColor = '#617080',
  pointerColor = backgroundColor,
  pointerStyle,
  onClose = () => {},
  onOpen = () => {},
  visible = false,
  skipAndroidStatusBar = false,
  ModalComponent = Modal,
  closeOnlyOnBackdropPress = false,
  animationType = 'fade',
  ...props
}) => {
  const isMounted = React.useRef(false);
  const renderedElement = React.useRef<View>(null);

  const [dimensions, setDimensions] = React.useState({
    yOffset: 0,
    xOffset: 0,
    elementWidth: 0,
    elementHeight: 0,
  });

  const getElementPosition = React.useCallback(() => {
    renderedElement.current?.measure(
      (
        _frameOffsetX,
        _frameOffsetY,
        _width = 0,
        _height = 0,
        pageOffsetX = 0,
        pageOffsetY = 0
      ) => {
        isMounted.current &&
          setDimensions({
            xOffset: pageOffsetX,
            yOffset:
              isIOS || skipAndroidStatusBar
                ? pageOffsetY
                : pageOffsetY -
                  Platform.select({
                    android: StatusBar.currentHeight,
                    ios: 20,
                    default: 0,
                  }),
            elementWidth: _width,
            elementHeight: _height,
          });
      }
    );
  }, [skipAndroidStatusBar]);

  const handleOnPress = React.useCallback(() => {
    getElementPosition();
    isMounted.current && toggleOnPress && (visible ? onClose?.() : onOpen?.());
  }, [getElementPosition, onClose, onOpen, toggleOnPress, visible]);

  const Pointer: React.FC<{
    tooltipY: number | string;
  }> = ({ tooltipY }) => {
    const { yOffset, xOffset, elementHeight, elementWidth } = dimensions;
    const pastMiddleLine = yOffset > (tooltipY || 0);
    if (!withPointer) {
      return null;
    }
    return (
      <View
        style={{
          position: 'absolute',
          top: pastMiddleLine ? yOffset - 13 : yOffset + elementHeight - 2,
          [I18nManager.isRTL ? 'right' : 'left']:
            xOffset +
            getElementVisibleWidth(elementWidth, xOffset, ScreenWidth) / 2 -
            7.5,
        }}
      >
        <Triangle
          style={pointerStyle}
          pointerColor={pointerColor}
          isDown={pastMiddleLine}
        />
      </View>
    );
  };

  const TooltipHighlightedButtonStyle = React.useMemo<ViewStyle>(() => {
    const { yOffset, xOffset, elementWidth, elementHeight } = dimensions;
    return {
      position: 'absolute',
      top: yOffset,
      [I18nManager.isRTL ? 'right' : 'left']: xOffset,
      backgroundColor: highlightColor,
      overflow: 'visible',
      width: elementWidth,
      height: elementHeight,
    };
  }, [dimensions, highlightColor]);

  const HighlightedButton: React.FC = () => {
    if (!closeOnlyOnBackdropPress) {
      return (
        <Pressable
          testID="tooltipTouchableHighlightedButton"
          onPress={handleOnPress}
          style={TooltipHighlightedButtonStyle}
        >
          {props.children}
        </Pressable>
      );
    } else {
      return (
        <View
          testID="tooltipTouchableHighlightedButton"
          style={TooltipHighlightedButtonStyle}
        >
          {props.children}
        </View>
      );
    }
  };

  /**
   * Listen for change in layout, i.e. Portrait or Landscape
   */
  React.useEffect(() => {
    isMounted.current = true;
    // Wait till element's position is calculated
    requestAnimationFrame(getElementPosition);
    const dimensionsListener = Dimensions.addEventListener(
      'change',
      getElementPosition
    );

    return () => {
      isMounted.current = false;
      if (dimensionsListener?.remove) {
        // react-native >= 0.65.*
        dimensionsListener.remove();
      } else {
        // react-native < 0.65.*
        Dimensions.removeEventListener('change', getElementPosition);
      }
    };
  }, [getElementPosition]);

  /**
   * Calculate position of tooltip
   */
  const tooltipStyle = React.useMemo(
    () =>
      getTooltipStyle({
        ...dimensions,
        backgroundColor,
        containerStyle,
        height,
        width,
        withPointer,
      }),
    [backgroundColor, containerStyle, dimensions, height, width, withPointer]
  );

  return (
    <View collapsable={false} ref={renderedElement}>
      <Pressable {...{ [toggleAction]: handleOnPress }} delayLongPress={250}>
        {props.children}
      </Pressable>
      <ModalComponent
        transparent
        visible={visible}
        onShow={onOpen}
        animationType={animationType}
      >
        <TouchableOpacity
          style={{
            backgroundColor: withOverlay ? overlayColor : 'transparent',
            flex: 1,
          }}
          onPress={handleOnPress}
          activeOpacity={1}
        >
          <View>
            <HighlightedButton />
            <Pointer tooltipY={tooltipStyle.top} />
            <View style={tooltipStyle} testID="tooltipPopoverContainer">
              {props.popover}
            </View>
          </View>
        </TouchableOpacity>
      </ModalComponent>
    </View>
  );
};

Tooltip.displayName = 'Tooltip';
