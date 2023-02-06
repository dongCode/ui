import React from 'react';
import { Field } from '@dplus/themed';
import { FormProvider, useForm } from 'react-hook-form';
import { Header } from '../components/header';

function Memo(props: any) {
  const form = useForm({});

  const { ...fieldAttributes } = props;

  return (
    <>
      <Header title="Fields" view="Field" />
      <FormProvider {...form}>
        <Field
          name="memo"
          rules={{
            validate(text) {
              const val = String(text)?.trim();
              const isInRange = val.length <= 20;
              const flag = isInRange;
              return flag;
            },
          }}
          containerStyle={{
            backgroundColor: '#fff',
            marginTop: 10,
            paddingLeft: 32,
          }}
          placeholder="请输入备注"
          {...fieldAttributes}
        />
      </FormProvider>
    </>
  );
}

export default Memo;
