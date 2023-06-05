import React from 'react';
import {Image, Modal, StyleSheet, TouchableOpacity} from 'react-native';

import close from '../assets/close.png';

type BottomModalProps = {
  visible?: boolean;
  onClose: () => void;
  children?: any;
};

const BottomModal: React.FC<BottomModalProps> = ({
  children,
  onClose,
  visible,
}) => (
  <Modal
    visible={visible}
    onRequestClose={onClose}
    animationType="fade"
    transparent={true}
    statusBarTranslucent={true}>
    <TouchableOpacity
      activeOpacity={1}
      style={[styles.container]}
      onPress={onClose}>
      <TouchableOpacity style={styles.modalContent}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Image
            source={close}
            style={{
              width: 16,
              height: 16,
            }}
          />
        </TouchableOpacity>
        {children}
      </TouchableOpacity>
    </TouchableOpacity>
  </Modal>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    paddingTop: 120,
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
