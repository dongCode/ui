import { StyleSheet } from 'react-native';

interface PlatformColors {
  primary: string;
  secondary: string;
  grey: string;
  searchBg: string;
  success: string;
  error: string;
  warning: string;
}

export interface Colors {
  readonly primary: string;
  readonly secondary: string;
  readonly background: string;
  readonly white: string;
  readonly black: string;
  readonly grey0: string;
  readonly grey1: string;
  readonly grey2: string;
  readonly grey3: string;
  readonly grey4: string;
  readonly grey5: string;
  readonly greyOutline: string;
  readonly searchBg: string;
  readonly success: string;
  readonly warning: string;
  readonly error: string;
  readonly disabled: string;
  readonly divider: string;
  readonly platform: {
    ios: PlatformColors;
    android: PlatformColors;
    web: PlatformColors;
    default: PlatformColors;
  };
}

export const lightColors: Colors = {
  primary: '#1F84FF',
  secondary: '#ad1457',
  background: '#ffffff',
  white: '#ffffff',
  black: '#242424',
  grey0: '#393e42',
  grey1: '#43484d',
  grey2: '#5e6977',
  grey3: '#86939e',
  grey4: '#bdc6cf',
  grey5: '#e1e8ee',
  greyOutline: '#bbb',
  searchBg: '#303337',
  success: '#52c41a',
  error: '#FF1F34',
  warning: '#FFA517',
  disabled: 'hsl(208, 8%, 90%)',
  // Darker color if hairlineWidth is not thin enough
  divider: StyleSheet.hairlineWidth < 1 ? '#bcbbc1' : 'rgba(0, 0, 0, 0.12)',
  platform: {
    ios: {
      primary: '#1F84FF',
      secondary: '#ad1457',
      grey: '#7d7d7d',
      searchBg: '#dcdce1',
      success: '#52c41a',
      error: '#FF1F34',
      warning: '#FFA517',
    },
    android: {
      primary: '#1F84FF',
      secondary: '#ad1457',
      grey: '#7d7d7d',
      searchBg: '#dcdce1',
      success: '#52c41a',
      error: '#FF1F34',
      warning: '#FFA517',
    },
    web: {
      primary: '#1F84FF',
      secondary: '#ad1457',
      grey: '#7d7d7d',
      searchBg: '#dcdce1',
      success: '#52c41a',
      error: '#FF1F34',
      warning: '#FFA517',
    },
    default: {
      primary: '#1F84FF',
      secondary: '#ad1457',
      grey: '#7d7d7d',
      searchBg: '#dcdce1',
      success: '#52c41a',
      error: '#FF1F34',
      warning: '#FFA517',
    },
  },
};

export const darkColors: Colors = {
  primary: '#439ce0',
  secondary: '#aa49eb',
  background: '#080808',
  white: '#080808',
  black: '#f2f2f2',
  grey5: '#393e42',
  grey4: '#43484d',
  grey3: '#5e6977',
  grey2: '#86939e',
  grey1: '#bdc6cf',
  grey0: '#e1e8ee',
  greyOutline: '#bbb',
  searchBg: '#303337',
  success: '#439946',
  error: '#bf2c24',
  warning: '#cfbe27',
  disabled: 'hsl(208, 8%, 90%)',
  // Darker color if hairlineWidth is not thin enough
  divider: StyleSheet.hairlineWidth < 1 ? '#84838a' : 'rgba(0, 0, 0, 0.12)',
  platform: {
    ios: {
      primary: '#1b262c',
      secondary: '#2089dc',
      grey: '#ffffff',
      searchBg: '#393e42',
      success: '#439946',
      error: '#bf2c24',
      warning: '#cfbe27',
    },
    android: {
      primary: '#1b262c',
      secondary: '#2089dc',
      grey: '#393e42',
      searchBg: '#393e42',
      success: '#439946',
      error: '#bf2c24',
      warning: '#cfbe27',
    },
    web: {
      primary: '#1b262c',
      secondary: '#2089dc',
      grey: '#ffffff',
      searchBg: '#393e42',
      success: '#439946',
      error: '#bf2c24',
      warning: '#cfbe27',
    },
    default: {
      primary: '#1b262c',
      secondary: '#2089dc',
      grey: '#ffffff',
      searchBg: '#393e42',
      success: '#439946',
      error: '#bf2c24',
      warning: '#cfbe27',
    },
  },
};
