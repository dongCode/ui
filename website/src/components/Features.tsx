import React from 'react';
import '../../static/css/components.css';
import Link from '@docusaurus/Link';
import { MdOutlineDevices, MdCode, MdEdit } from 'react-icons/md';
import { IconTag } from './IconTag';

type FeatureTypes = {
  title: string;
  description: string;
  img?: ({ ...props }: React.SVGProps<SVGSVGElement>) => JSX.Element;
  color: string;
};

const features: FeatureTypes[] = [
  {
    title: '跨平台',
    description: '兼容 android, iOS, and web. 30+ 组件支持.',
    img: MdOutlineDevices,
    color: '#894cff',
  },
  {
    title: '简单易用',
    description: '完全由TypeScript书写',
    img: MdCode,
    color: '#ff5381',
  },
  {
    title: '定制化',
    description: '定制化样式开发',
    img: MdEdit,
    color: '#00b85c',
  },
];

const Home: React.FunctionComponent<{}> = () => {
  return (
    <section className="" id="why">
      <div className="container">
        <div className="row is-multiline">
          {features.map(({ title, description, img, color }, index) => (
            <div className="col col--3" key={index}>
              <Link className="card shadow--md" style={{ height: '100%' }}>
                <div className="card__body">
                  <h4 className="gradient clip-text inline-flex-center">
                    <IconTag
                      icon={img}
                      color={color}
                      style={{ marginRight: 8 }}
                    />
                    {title}
                  </h4>
                  <p
                    className="p--desc"
                    style={{ lineHeight: 1.4, fontSize: '0.8rem' }}
                  >
                    {description}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
