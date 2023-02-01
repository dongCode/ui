import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';

export default function () {
  const { colorMode } = useColorMode();
  const darkFooter = colorMode === 'dark' ? 'footer-dark' : '';
  return (
    <footer
      style={{ fontSize: 'small' }}
      className={'footer text--sm ' + darkFooter}
    >
      <div className="container container-fluid">
        <div className="row">
          <div style={{ marginRight: 8 }}>
            <a href="/docs">文档</a>
          </div>
          <div style={{ marginRight: 8 }}>
            <a href="/blog">博客</a>
          </div>
          <div>
            <a href="/docs/customizing">定制化</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
