import React from 'react';
import {
  Image,
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import closeIcon from '../assets/close.png';

type FormModalProps = {
  visible?: boolean;
  onClose: () => void;
  children?: any;
};

const FormModal: React.FC<FormModalProps> = ({children, onClose, visible}) => (
  <Modal
    visible={visible}
    onRequestClose={onClose}
    animationType="fade"
    transparent={true}
    statusBarTranslucent={true}>
    <TouchableOpacity
      // disabled={true}
      activeOpacity={1}
      style={[styles.container]}
      onPress={onClose}>
      <View style={styles.modalContent}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Image source={closeIcon} style={styles.image} />
        </TouchableOpacity>
        {children}
      </View>
    </TouchableOpacity>
  </Modal>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'ios' ? 170 : 200,
    height: '100%',
    width: '100%',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopEndRadius: 22,
    borderTopStartRadius: 22,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 20,
    borderWidth: 1,
    borderColor: '#A6A6A6',
    height: '100%',
    width: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 24,
    right: 24,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: 24,
    height: 24,
  },
});

export default FormModal;
