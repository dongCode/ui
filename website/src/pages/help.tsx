import React from 'react';
import Layout from '@theme/Layout';

const Help: React.FunctionComponent<{}> = () => {
  type SupportLinkTypes = {
    content: string;
    title: string;
    link?: string;
    href?: string;
  };

  const supportLinks: SupportLinkTypes[] = [
    {
      content: '掌握文档内容 ',
      title: '仔细阅读文档',
      link: '文档链接',
      href: 'docs',
    },
    {
      content: '巩固基础，提升理解',
      title: 'JavaScript学习',
    },
    {
      content: '提升个人编程能力',
      title: '阅读源码',
    },
  ];

  const FeatureHeading: React.FunctionComponent<{}> = () => {
    return (
      <div className="row">
        {supportLinks.map((link) => {
          return (
            <div className="col">
              <h2>{link.title}</h2>
              <p className="padding-horiz--md">
                {link.content}{' '}
                {link.href ? <a href={link.href}>{link.link}</a> : null}
              </p>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Layout className="mainContainer documentContainer postContainer">
      <div className="container margin-vert--xl">
        <header className="postHeader">
          <h2>需要帮助?</h2>
        </header>
        <p>建议如下：</p>
        <div>
          <div className="container text--center margin-bottom--xl">
            <FeatureHeading />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Help;
