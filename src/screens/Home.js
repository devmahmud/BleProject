import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Button,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {BleManager} from 'react-native-ble-plx';
import {addDevice, clearDevice} from '../store/deviceSlice';
import DeviceCard from '../components/DeviceCard';

const manager = new BleManager();

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'BLE APP Permission',
        message: 'BlE App needs location permission to operate correctly.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can now use the app');
    } else {
      console.log('Location permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

const Home = () => {
  const {devices} = useSelector(state => state.device);

  // state to give the user a feedback about the manager scanning devices
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const scanDevices = async () => {
    // display the Activityindicator
    setIsLoading(true);

    // Request for location permission
    requestLocationPermission();

    // Enable bluetooth before scanning
    if (Platform.OS === 'android') {
      manager
        .enable()
        .then(res => console.log(res))
        .catch(error => console.log(error));
    }

    manager.startDeviceScan(null, null, (error, scannedDevice) => {
      if (error) {
        console.warn(error);
      }
      if (scannedDevice) {
        dispatch(addDevice(scannedDevice));
      }
    });
    // stop scanning devices after few seconds
    setTimeout(() => {
      manager.stopDeviceScan();
      setIsLoading(false);
    }, 5000);
  };

  useEffect(() => {
    return () => {
      manager.destroy();
    };
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.topView}>
        <Button title="Clear devices" onPress={() => dispatch(clearDevice())} />
      </View>

      {isLoading ? (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator color={'teal'} size={25} />
        </View>
      ) : (
        <Button title="Scan devices" onPress={scanDevices} />
      )}

      <FlatList
        style={styles.deviceList}
        keyExtractor={item => item.id}
        data={devices}
        renderItem={({item}) => <DeviceCard device={item} />}
        contentContainerStyle={styles.content}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topView: {
    marginVertical: 10,
  },
  content: {
    paddingHorizontal: 5,
  },
  btnContainer: {
    flex: 2,
    flexDirection: 'row',
    marginLeft: 20,
  },
  activityIndicatorContainer: {marginVertical: 6},
  deviceList: {
    marginTop: 10,
  },
});

export default Home;
