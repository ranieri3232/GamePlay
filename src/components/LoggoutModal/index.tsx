import React from 'react';
import { RectButton } from 'react-native-gesture-handler';
import { View, Modal, ModalProps, Text, Pressable } from 'react-native';

import { styles } from './styles';

interface Props extends ModalProps{
  handleCancel: () => void;
  handleConfirm: () => void;
}

export function LoggoutModal({handleCancel, handleConfirm, ...rest}: Props){
  
  function test(){
    console.log('prestou aaaaaa s');
  }
  return (
    <Modal
      transparent
      statusBarTranslucent
      visible={true}
      animationType="slide"
      {...rest}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.textContent}>
            <Text style={styles.text}>
              Deseja sair do 
            </Text>
            <Text style={styles.textGame}>
              Game
            </Text>
            <Text style={styles.textPlay}>
              Play
            </Text>
            <Text style={styles.textQuestionMark}>
              ?
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.buttonCancel}
              onPress={handleCancel}
            >
              <Text style={styles.textCancel}>
                Não
              </Text>
            </Pressable>
            <Pressable
              style={styles.buttonConfirm}
              onPress={handleConfirm}
            >
              <Text style={styles.textConfirm}>
                Sim
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
