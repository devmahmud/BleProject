import React, {useState, useEffect} from 'react';
import {Text, View, Button} from 'react-native';
import {useSelector} from 'react-redux';
import {BleManager, Device} from 'react-native-ble-plx';

const manager = new BleManager();

const Home = () => {
  const {user} = useSelector(state => state.user);

  // state to give the user a feedback about the manager scanning devices
  const [isLoading, setIsLoading] = useState(false);

  const scanDevices = () => {
    // display the Activityindicator
    setIsLoading(true);

    manager.enable().then(() => {
      // scan devices
      manager.startDeviceScan(null, null, (error, scannedDevice) => {
        if (error) {
          console.warn(error);
        }
        console.log(scannedDevice);
      });

      // stop scanning devices after 5 seconds
      setTimeout(() => {
        manager.stopDeviceScan();
        setIsLoading(false);
      }, 5000);
    });
  };

  useEffect(() => {
    return () => {
      manager.destroy();
    };
  }, []);

  return (
    <View>
      <Text>Home Screen</Text>
      <Button title="Scan devices" onPress={scanDevices} />
    </View>
  );
};

export default Home;
