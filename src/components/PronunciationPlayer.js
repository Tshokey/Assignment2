import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Audio } from 'expo-av';
import Ionicons from 'react-native-vector-icons/Ionicons';
import audioFiles from '../../resources/audioMap';

export default function PronunciationPlayer({ label, sound, gender, isOpen, onOpen, onClose }){
  const [speed, setSpeed] = useState(1.0);
  const [items, setItems] = useState([
    { label: '1.0', value: 1.0 },
    { label: '0.75', value: 0.75 },
    { label: '0.33', value: 0.33 },
    { label: '0.25', value: 0.25 },
  ]);

  const playSound = async () => {
    try {
      const fileKey = `${label} ${gender === 'male' ? '1 - male' : '- female'}.wav`;
      const audioModule = audioFiles[fileKey];

      if (!audioModule) {
        console.warn(`Audio not found for: ${fileKey}`);
        return;
      }

      const { sound: playbackObject } = await Audio.Sound.createAsync(audioModule);
      await playbackObject.setRateAsync(speed, true);
      await playbackObject.playAsync();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  const genderIcon = gender === 'male' ? 'male' : 'female';
  const genderColor = gender === 'male' ? '#007AFF' : '#FF2D55';

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={playSound} style={styles.iconButton}>
        <Ionicons name="volume-high" size={20} color="black" />
      </TouchableOpacity>

      <Text style={styles.label}>{label}</Text>

      <Ionicons name={genderIcon} size={20} color={genderColor} style={styles.genderIcon} />

      <View style={{ width: 100, zIndex: 1000}}>
        <DropDownPicker
          open={isOpen}
          setOpen={(open) => (open ? onOpen() : onClose())}
          value={speed}
          setValue={(valueOrFn) => {
            const value = typeof valueOrFn === 'function' ? valueOrFn(speed) : valueOrFn;
            setSpeed(value);
          }}
          items={items}
          setItems={setItems}
          style={styles.dropdown}
          dropDownContainerStyle={{ zIndex: 2000 }}
          textStyle={{ fontSize: 14 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 2,
  },
  iconButton: {
    marginRight: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
  },
  genderIcon: {
    marginHorizontal: 10,
  },
  dropdown: {
    minHeight: 30,
    borderColor: '#ccc',
    zIndex: 1000,

  },
});


