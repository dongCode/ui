import React from 'react';
import Layout from '@theme/Layout';
import Features from '../components/Features';
import Installation from '../components/Installation';
import '../../static/css/components.css';

const Home: React.FunctionComponent<{}> = () => {
  return (
    <Layout>
      <Features />
      <Installation />
    </Layout>
  );
};

export default Home;
