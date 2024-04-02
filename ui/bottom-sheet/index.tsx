import { forwardRef, useCallback } from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from '@gorhom/bottom-sheet'; //https://ui.gorhom.dev/components/bottom-sheet
import { type BottomSheetProps } from '../../types/ui';

const BottomSheet = forwardRef<BottomSheetModal, BottomSheetProps>(({ snapPoints, enableDynamicSizing, enablePanDownToClose, children, onOpen, onClose }, ref) => {

  const renderBackdrop = useCallback((props: BottomSheetBackdropProps) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />, []);

  const props = enableDynamicSizing ? { enableDynamicSizing, enablePanDownToClose } : { snapPoints, enablePanDownToClose, index: 0 };

  return (
    <BottomSheetModal
      ref={ref}
      backdropComponent={renderBackdrop}
      onChange={(index) => index === -1 ? onClose && onClose() : onOpen && onOpen()}
      {...props}
      /* backgroundStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.01)' }} */
    /* keyboardBehavior={Platform.OS === 'android' ? 'extend' : 'interactive'} */
    /* keyboardBlurBehavior="restore" */
    >
      {children}
    </BottomSheetModal>
  )
})

export default BottomSheet