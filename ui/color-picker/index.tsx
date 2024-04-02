import React, { useCallback, useRef } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Controller } from 'react-hook-form';
import BottomSheet from '../bottom-sheet';
import { theme } from '../../styles';
import { getVariantStyle } from '../../utils';
import { FormControllerProps, type ColorPickerProps } from '../../types/ui';

const ColorPickerRN: React.FC<ColorPickerProps> = ({ variant, value, onChange }) => {
  const ref = useRef<BottomSheetModal>(null);

  const handleSnapPress = useCallback(() => {
    ref.current?.present();
  }, []);

  const onColorChange = (color: string) => onChange && onChange(color);

  return (
    <>
      <TouchableOpacity
        style={[
          styles.input,
          getVariantStyle(variant, styles)
        ]}
        onPress={handleSnapPress}
      >
        <View style={[styles.color_circle, { backgroundColor: value }]}></View>
        <Text style={styles.color_text}>{value}</Text>
      </TouchableOpacity>
      <BottomSheet
        ref={ref}
        enableDynamicSizing
        enablePanDownToClose
      >
        <BottomSheetScrollView style={{ paddingHorizontal: 20 }}>
          <View style={{ marginBottom: 30 }}>
            <ColorPicker
              color={value}
              onColorChangeComplete={(color) => onColorChange(color)}
              thumbSize={30}
              sliderSize={30}
              noSnap={true}
              row={false}
              /* swatches={false} */
              /* swatchesOnly */
              /* discrete */
              /* palette={[
                '#ffffff',
                '#878787',
                '#ed1c23',
                '#d31bd6',
                '#1632e5',
                '#00afef',
                '#00c65c',
                '#57ff0a',
                '#ffdc16',
                '#f26321'
              ]} */
            />
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </>
  )
}

export const FormColorPicker: React.FC<FormControllerProps & ColorPickerProps> = ({
  control,
  name,
  rules,
  variant = 'outlined'
}) => {
  const renderItem = (
    value: any,
    onChange: (...event: any[]) => void
  ) => (
    <>
      <ColorPickerRN
        variant={variant}
        value={value?.toString()}
        onChange={onChange}
      />
    </>
  );

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange } }) =>
        renderItem(value, onChange)
      }
    />
  );
};

export default ColorPickerRN

const styles = StyleSheet.create({
  label: {
    fontWeight: '500',
    fontSize: theme.fontSize.md,
    marginBottom: 4
  },
  input: {
    justifyContent: 'space-between',
    height: 40,
    backgroundColor: 'transparent',
    alignItems: 'center',
    flexDirection: 'row'
  },
  outlined: {
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8
  },
  standard: {
    borderBottomWidth: 1
  },
  color_circle: {
    height: 30,
    width: 30,
    borderRadius: 30,
    borderWidth: 1
  },
  color_text: {
    fontSize: theme.fontSize.md,
  }
});