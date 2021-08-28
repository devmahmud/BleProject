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
    backgroundColor: '#69ebd0',
    marginBottom: 12,
    borderRadius: 16,
    shadowColor: 'rgba(149, 249, 227, 0.7)',
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 4,
    padding: 12,
  },
});

export default DeviceCard;
