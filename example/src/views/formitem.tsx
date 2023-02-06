import React from 'react';
import { FormItem } from '@dplus/themed';
import { FormProvider, useForm } from 'react-hook-form';
import { Header } from '../components/header';

function Memo() {
  const form = useForm({});
  return (
    <>
      <Header title="FormItems" view="FormItem" />
      <FormProvider {...form}>
        <FormItem
          name="basic_present_quantity"
          label="赠品基本数量"
          unit={'条'}
        />
      </FormProvider>
    </>
  );
}

export default Memo;
