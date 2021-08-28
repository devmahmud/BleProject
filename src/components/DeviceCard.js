import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const DeviceCard = ({device}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('Device', {device})}>
      <Text>{`Name : ${device.name}`}</Text>
      <Text>{`RSSI : ${device.rssi}`}</Text>
      <Text>{`UUIDS : ${device.serviceUUIDs}`}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#49d49d',
    marginBottom: 12,
    borderRadius: 16,
    shadowColor: 'rgba(73, 212, 157, 0.6)',
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 8,
    padding: 12,
  },
});

export default DeviceCard;
