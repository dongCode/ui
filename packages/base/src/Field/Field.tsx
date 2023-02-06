import { Input } from '../Input';
import React from 'react';
import { useFormContext, Controller, RegisterOptions } from 'react-hook-form';
import FieldStyle from './FieldStyle';

export interface FieldProps extends React.ComponentProps<typeof Input> {
  /**
   * 对应的键值
   */
  name: string;
  /**
   * 校验规则
   */
  rules?: RegisterOptions;
  /**
   * 字体颜色
   */
  textColor?: string;
  /**
   * 格式化字体
   */
  formatter?: (oldValue: string, newValue: string) => string;
  /**
   * 是否有查看权限
   */
  auth?: boolean;
}

export const Field: React.FC<FieldProps> = (props) => {
  const {
    name,
    rules,
    formatter,
    onBlur,
    textColor,
    // errorMsg = '',
    auth = true,
    ...restOfProps
  } = props;
  const {
    control,
    // formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      render={({ field }) => (
        // @ts-ignore
        <Input
          {...restOfProps}
          style={[
            FieldStyle.container,
            {
              color: textColor || '',
            },
          ]}
          errorStyle={FieldStyle.error}
          value={auth ? field.value : '***'}
          onBlur={(event) => {
            field.onBlur();
            onBlur?.(event);
          }}
          onChangeText={(text) => {
            const formatted = formatter ? formatter(field.value, text) : text;
            field.onChange(formatted);
          }}
          selectTextOnFocus
        />
      )}
      rules={rules}
      name={name}
    />
  );
};
