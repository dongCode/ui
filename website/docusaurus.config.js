/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'React Native Elements' /* title for your website */,
  tagline: 'Cross Platform React Native UI Toolkit',
  url: 'https://reactnativeelements.com' /* your website url */,
  baseUrl: '/' /* base url for your project */,
  projectName: 'react-native-elements',
  organizationName: 'react-native-elements',
  clientModules: [require.resolve('./plugins/snackPlayerInitializer.js')],
  /* path to images for header/footer */
  favicon: '/img/website/logo.png',

  // This copyright info is used in /core/Footer.js and blog rss/atom feeds.
  scripts: [{ src: 'https://snack.expo.io/embed.js', defer: true }],
  themes: ['@docusaurus/theme-live-codeblock'],
  plugins: ['./plugins/react-native-elements-web.js'],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        gtag: {
          trackingID: 'G-RW24X04H53',
          anonymizeIP: true,
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['**/component_usage/**'],
        },
        docs: {
          exclude: ['**/component_usage/**'],
          path: 'docs',
          versions: {
            current: {
              label: 'Bleeding Edge 🚧',
            },
          },
          routeBasePath: 'docs',
          sidebarPath: require.resolve('./sidebars.ts'),
          remarkPlugins: [require('./plugins/remark-snackplayer')],
          editUrl:
            'https://github.com/react-native-elements/react-native-elements/edit/next/website/',
        },
        theme: {
          customCss: require.resolve('./static/css/custom.css'),
        },
      },
    ],
  ],
  themeConfig: {
    image: '/img/website/seo.png',
    liveCodeBlock: {
      playgroundPosition: 'top',
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
    },
    navbar: {
      title: 'React Native Elements',
      logo: {
        alt: 'React Native Elements Logo',
        src: '/img/website/logo.png',
      },
      // hideOnScroll: true,
      items: [
        // {
        //   type: 'docsVersionDropdown',
        //   position: 'right',
        //   dropdownItemsAfter: [{ to: 'versions', label: 'All versions' }],
        //   // Do not add the link active class when browsing docs.
        //   dropdownActiveClassDisabled: true,
        //   docsPluginId: 'default',
        // },
        { to: 'docs/', label: '文档', position: 'left' },
        // { to: 'help', label: 'Help', position: 'right' },
        { to: 'blog', label: '博客', position: 'left' },
        // { type: 'search', position: 'right' },
        {
          href: 'https://github.com/react-native-elements/react-native-elements',
          // label: 'GitHub',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    prism: {
      theme: require('prism-react-renderer/themes/github'),
      darkTheme: require('prism-react-renderer/themes/shadesOfPurple'),
      defaultLanguage: 'typescript',
    },
    // algolia: {
    //   appId: 'RE3E65KUI0',
    //   apiKey: 'dbc0364e21346919060006f77fd462f1',
    //   indexName: 'react_native_elements',
    // },
  },
  baseUrlIssueBanner: false,
  trailingSlash: false,
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  onDuplicateRoutes: 'warn',
  staticDirectories: ['static'],
};

module.exports = config;
