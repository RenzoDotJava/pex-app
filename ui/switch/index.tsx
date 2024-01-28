import React, { useState } from 'react'
import { Switch as SwitchRN } from 'react-native'
import { theme } from '../../styles';
import { type FormControllerProps, type SwitchProps } from '../../types/ui';
import { Controller } from 'react-hook-form';

const Switch: React.FC<SwitchProps> = ({ value, onChange }) => {
  return (
    <SwitchRN
      trackColor={{ true: theme.color.primary.lightest, false: theme.color.neutral.medium }}
      thumbColor={value ? theme.color.primary.dark : theme.color.neutral.medium}
      ios_backgroundColor={theme.color.neutral.medium}
      onValueChange={onChange}
      value={value}
    />
  )
}

export const FormSwitch: React.FC<FormControllerProps & SwitchProps> = ({ control, name, rules }) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange } }) =>
        <Switch value={value} onChange={onChange} />
      }
    />
  );
}

export default Switch