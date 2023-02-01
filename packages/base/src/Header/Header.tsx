import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  ImageBackground,
  StyleProp,
  TextProps,
  ViewProps,
  StatusBarProps,
  StatusBarStyle,
  ImageSourcePropType,
  ImageStyle,
  ViewStyle,
  SafeAreaView,
  Text,
} from 'react-native';
import { RneFunctionComponent } from '../helpers';
import { Children } from './components/HeaderChildren';
import { HeaderIcon } from './components/HeaderIcon';

type HeaderSubComponent = React.ReactElement<{}> | TextProps | HeaderIcon;

export interface HeaderProps extends ViewProps {
  /** Component for container.
   *
   * @default View
   */
  ViewComponent?: typeof React.Component;

  /** Displays a linear gradient. See [usage](#lineargradient-usage). */
  linearGradientProps?: Object;

  /** Accepts all props for StatusBar. */
  statusBarProps?: StatusBarProps;

  /** Sets the color of the status bar text. */
  barStyle?: StatusBarStyle;

  /** Define your left component here. */
  leftComponent?: HeaderSubComponent;

  /** Define your center component here. */
  centerComponent?: HeaderSubComponent;

  /** Define your right component here. */
  rightComponent?: HeaderSubComponent;

  /** Sets backgroundColor of the parent component. */
  backgroundColor?: string;

  /** Sets backgroundImage for parent component. */
  backgroundImage?: ImageSourcePropType;

  /** Styling for backgroundImage in the main container. */
  backgroundImageStyle?: ImageStyle;

  /** Alignment for title. */
  placement?: 'left' | 'center' | 'right';

  /** Styling around the main container. */
  containerStyle?: StyleProp<ViewStyle>;

  /** Styling for container around the centerComponent. */
  centerContainerStyle?: StyleProp<ViewStyle>;

  /** Styling for container around the leftComponent. */
  leftContainerStyle?: StyleProp<ViewStyle>;

  /** Styling for container around the rightComponent. */
  rightContainerStyle?: StyleProp<ViewStyle>;

  /** Add children component to the header. */
  children?: JSX.Element | JSX.Element[];

  /** Elevation for header */
  elevated?: boolean;

  title?: string;
  onBack?: () => void;
  backIcon?: JSX.Element;
}

interface ITitle {
  title?: string;
}
const Title = (props: ITitle) => {
  const { title = '条件查询' } = props;
  return <Text style={{ color: 'white', fontSize: 18 }}>{title}</Text>;
};

/** Headers are navigation components that display information and actions relating to the current screen.
 * **Note:**
 * Make sure that you have completed [Step 3](../installation#install-react-native-safe-area-context) in the setup guide before using `Header`.
 */
export const Header: RneFunctionComponent<HeaderProps> = ({
  statusBarProps,
  leftComponent,
  centerComponent,
  rightComponent,
  leftContainerStyle,
  centerContainerStyle,
  rightContainerStyle,
  backgroundColor,
  backgroundImage,
  backgroundImageStyle,
  containerStyle,
  placement = 'center',
  barStyle,
  children = [],
  linearGradientProps,
  ViewComponent = linearGradientProps || !backgroundImage
    ? View
    : ImageBackground,
  elevated,
  title,
  ...rest
}) => {
  React.useEffect(() => {
    if (linearGradientProps && !ViewComponent) {
      console.warn(
        "You need to pass a ViewComponent to use linearGradientProps !\nExample: ViewComponent={require('react-native-linear-gradient')}"
      );
    }
  });

  return (
    <SafeAreaView>
      <ViewComponent
        testID="headerContainer"
        {...rest}
        style={StyleSheet.flatten([
          {
            height: 40,
            backgroundColor: '#1F84FF',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
          },
          backgroundColor && { backgroundColor },
          elevated && styles.elevatedHeader,
          containerStyle,
        ])}
        source={backgroundImage}
        imageStyle={backgroundImageStyle}
        {...linearGradientProps}
      >
        <>
          <Children
            style={StyleSheet.flatten([
              placement === 'center' && styles.rightLeftContainer,
              leftContainerStyle,
            ])}
            placement="left"
          >
            {(React.isValidElement(children) && children) ||
              children[0] ||
              leftComponent}
          </Children>
          <Children
            style={StyleSheet.flatten([
              styles.centerContainer,
              placement !== 'center' && {
                paddingHorizontal: Platform.select({
                  android: 16,
                  default: 15,
                }),
              },
              centerContainerStyle,
            ])}
            placement={placement}
          >
            {typeof title !== 'string' ? (
              children[1] || centerComponent
            ) : (
              <Title title={title} />
            )}
          </Children>

          <Children
            style={StyleSheet.flatten([
              placement === 'center' && styles.rightLeftContainer,
              rightContainerStyle,
            ])}
            placement="right"
          >
            {children[2] || rightComponent}
          </Children>
        </>
      </ViewComponent>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
  },
  rightLeftContainer: {
    flex: 1,
  },
  elevatedHeader: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.6,
    shadowRadius: 8.0,
    elevation: 24,
  },
});

Header.displayName = 'Header';
