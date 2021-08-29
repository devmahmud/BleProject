import React, {useState, useCallback, useEffect} from 'react';
import {Text, View, ScrollView, Button, StyleSheet} from 'react-native';
import ServiceCard from '../components/ServiceCard';

const Device = ({navigation, route}) => {
  // get the device object which was given through navigation params
  const {device} = route.params;

  const [isConnected, setIsConnected] = useState(false);
  const [services, setServices] = useState([]);

  // handle the device disconnection
  const disconnectDevice = useCallback(async () => {
    const isDeviceConnected = await device.isConnected();
    if (isDeviceConnected) {
      await device.cancelConnection();
    }
    navigation.navigate('Home');
  }, [device, navigation]);

  useEffect(() => {
    const getDeviceInformations = async () => {
      // connect to the device
      const connectedDevice = await device.connect();
      setIsConnected(true);

      // discover all device services and characteristics
      const allServicesAndCharacteristics =
        await connectedDevice.discoverAllServicesAndCharacteristics();
      // get the services only
      const discoveredServices = await allServicesAndCharacteristics.services();
      setServices(discoveredServices);
    };

    getDeviceInformations();

    device.onDisconnected(() => {
      navigation.navigate('Home');
    });

    // give a callback to the useEffect to disconnect the device when we will leave the device screen
    return () => {
      disconnectDevice();
    };
  }, [device, disconnectDevice, navigation]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button title="disconnect" onPress={disconnectDevice} color="#FE5D26" />
      <View>
        <View style={styles.header}>
          <Text>{`Id : ${device.id}`}</Text>
          <Text>{`Name : ${device.name}`}</Text>
          <Text>{`Is connected : ${isConnected}`}</Text>
          <Text>{`RSSI : ${device.rssi}`}</Text>
          <Text>{`Manufacturer : ${device.manufacturerData}`}</Text>
          <Text>{`ServiceData : ${device.serviceData}`}</Text>
          <Text>{`UUIDS : ${device.serviceUUIDs}`}</Text>
        </View>
        {/* Display a list of all services */}
        <Text style={styles.title}>Services</Text>
        {services?.map(service => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },

  header: {
    marginVertical: 10,
    borderRadius: 16,
    backgroundColor: '#7ebc89',
    shadowColor: 'rgba(60,64,67,0.3)',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 4,
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fe5d26',
    padding: 5,
    borderRadius: 10,
    textAlign: 'center',
    marginBottom: 5,
  },
});

export default Device;
