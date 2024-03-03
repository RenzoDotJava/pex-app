import React, { useCallback, useRef, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import BottomSheet from '../bottom-sheet';
import Button from '../button';

const ColorPickerRN = () => {
  const ref = useRef<BottomSheetModal>(null);
  const [color, setColor] = useState('#fff');

  const handleSnapPress = useCallback(() => {
    ref.current?.present();
  }, []);

  const onColorChange = (color: string) => {
    console.log(color)
    setColor(color);
  };

  return (
    <>
      <TouchableOpacity
        style={{ height: 50, width: 50, backgroundColor: color }}
        onPress={handleSnapPress}
      >
        <Text>Hola</Text>
        {/* <AntDesign name="down" size={20} color={theme.color.neutral.dark} /> */}
      </TouchableOpacity>
      <BottomSheet
        ref={ref}
        enableDynamicSizing
        enablePanDownToClose
      >
        <BottomSheetScrollView style={{ paddingHorizontal: 20 }}>
          <View style={{ marginBottom: 30 }}>
            <ColorPicker
              color={color}
              onColorChangeComplete={(color) => onColorChange(color)}
              thumbSize={30}
              sliderSize={30}
              noSnap={true}
              row={false}
            />
          </View>
          {/* <View style={{ paddingBottom: 20 }}>
            <Button
              text='Guardar'
            />
          </View> */}
        </BottomSheetScrollView>
      </BottomSheet>
    </>
  )
}

export default ColorPickerRN