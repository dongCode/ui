import React from 'react';
import '../../static/css/components.css';
import CodeBlock from '@theme/CodeBlock';

const exampleCode = `import React from 'react';
import { Button } from '@dplus/base';

const AwesomeButton = () => (<Button title='Welcome'/>)`;

const Home: React.FunctionComponent<{}> = () => {
  return (
    <>
      <section className="margin-vert--xl">
        <div className="container ">
          <div className="row" style={{ alignItems: 'center' }}>
            <div className="col col--5 text--center">
              <h6 className="hero__title gradient clip-text">立即开始</h6>
            </div>
            <div className="col col--7 ">
              <p>
                <b>1. Install</b>
                <p className="margin-vert--md margin-horiz--md">
                  <CodeBlock language="bash">
                    npm install @dplus/base @dplus/themed
                  </CodeBlock>
                </p>

                <b>2. 引入组件</b>
                <p className="margin-vert--md margin-horiz--md">
                  <CodeBlock language="tsx">{exampleCode}</CodeBlock>
                </p>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
