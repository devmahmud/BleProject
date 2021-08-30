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
    backgroundColor: '#7ebc89',
    marginBottom: 12,
    borderRadius: 16,
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 8,
    padding: 12,
  },
});

export default DeviceCard;
