import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import base64 from 'react-native-base64';

const DescriptorCard = ({descriptor}) => {
  const [value, setValue] = useState('');
  useEffect(() => {
    (async () => {
      descriptor.read().then(r => {
        if (r && r.value) {
          setValue(r.value);
        }
      });
    })();
  }, []);
  return (
    <View>
      <Text>
        {descriptor.id + ' -> ' + base64.decode(value) + '(' + value + ')'}
      </Text>
    </View>
  );
};

export default DescriptorCard;
