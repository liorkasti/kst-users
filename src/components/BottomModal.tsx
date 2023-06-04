import React from 'react';
import {
  Image,
  Modal,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import close from '../assets/close.png';
import Button from './Button';

type BottomModalProps = {
  visible?: boolean;
  onClose: () => void;
  children?: any;
  size: number;
};

const BottomModal: React.FC<BottomModalProps> = ({
  children,
  onClose,
  visible,
  modalsize,
}) => (
  <Modal
    visible={visible}
    onRequestClose={onClose}
    animationType="slide"
    transparent={true}
    statusBarTranslucent={true}>
    <TouchableOpacity
      activeOpacity={1}
      style={[
        styles.container,
        {paddingTop: modalsize + StatusBar.currentHeight},
      ]}
      onPress={onClose}>
      <TouchableOpacity style={styles.modalContent}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Image
            source={close}
            style={{
              width: 13.5,
              height: 13.5,
            }}
          />
        </TouchableOpacity>
        {children}
        {/* <Button onPress={onButtonPress} text="Create" /> */}
      </TouchableOpacity>
    </TouchableOpacity>
  </Modal>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',

    height: '100%',
    width: '100%',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 22,
    paddingHorizontal: 32,
    paddingTop: 50,
    paddingBottom: 20,
    borderWidth: 1,
    borderColor: '#A6A6A6',
    height: '100%',
    width: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 23.25,
    right: 25.25,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BottomModal;
