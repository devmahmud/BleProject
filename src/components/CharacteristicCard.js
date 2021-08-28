import React, {useEffect, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import base64 from 'react-native-base64';

const decodeBleString = value => {
  if (!value) {
    return '';
  }
  return base64.decode(value).charCodeAt(0);
};

const CharacteristicCard = ({char}) => {
  const [measure, setMeasure] = useState('');
  const [descriptor, setDescriptor] = useState('');

  useEffect(() => {
    // discover characteristic descriptors

    char.descriptors().then(desc => {
      desc[0]?.read().then(val => {
        if (val) {
          setDescriptor(base64.decode(val.value));
        }
      });
    });

    if (char.serviceUUID === '0000180f-0000-1000-8000-00805f9b34fb') {
      char.read().then(res => {
        console.log('Battery Percentage:', res.value);
      });
      // // console.log(res);
      // console.log(Buffer.from('Ig==', 'base64').readUInt16LE(0));
    }

    // read on the characteristic
    char.monitor((err, cha) => {
      if (err) {
        console.warn('ERROR', err);
        return;
      }
      // each received value has to be decoded with a Base64
      setMeasure(decodeBleString(cha?.value));
    });
  }, [char]);

  // write on a charactestic the number 6 (e.g.)
  const writeCharacteristic = () => {
    // encode the string with the Base64 algorythm
    char
      .writeWithResponse(base64.encode('6'))
      .then(() => {
        console.warn('Success');
      })
      .catch(e => console.log('Error', e));
  };

  return (
    <TouchableOpacity
      key={char.uuid}
      style={styles.container}
      // onPress={writeCharacteristic}
    >
      <Text style={styles.measure}>{measure}</Text>
      <Text style={styles.descriptor}>{descriptor}</Text>
      <Text>{`isIndicatable : ${char.isIndicatable}`}</Text>
      <Text>{`isNotifiable : ${char.isNotifiable}`}</Text>
      <Text>{`isNotifying : ${char.isNotifying}`}</Text>
      <Text>{`isReadable : ${char.isReadable}`}</Text>
      <TouchableOpacity>
        <Text>{`isWritableWithResponse : ${char.isWritableWithResponse}`}</Text>
      </TouchableOpacity>
      <Text>{`isWritableWithoutResponse : ${char.isWritableWithoutResponse}`}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginVertical: 12,
    borderRadius: 16,
    shadowColor: 'rgba(60,64,67,0.3)',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    padding: 12,
  },
  measure: {color: 'red', fontSize: 17},
  descriptor: {color: 'blue', fontSize: 17},
});

export default CharacteristicCard;
