import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CharacteristicCard from './CharacteristicCard';
import DescriptorCard from './DescriptorCard';

const ServiceCard = ({service}) => {
  const [descriptors, setDescriptors] = useState([]);
  const [characteristics, setCharacteristics] = useState([]);
  const [areCharacteristicsVisible, setAreCharacteristicsVisible] =
    useState(false);

  useEffect(() => {
    const getCharacteristics = async () => {
      const newCharacteristics = await service.characteristics();
      setCharacteristics(newCharacteristics);
      newCharacteristics.forEach(async characteristic => {
        const newDescriptors = await characteristic.descriptors();
        setDescriptors(prev => [...new Set([...prev, ...newDescriptors])]);
      });
    };

    getCharacteristics();
  }, [service]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setAreCharacteristicsVisible(prev => !prev);
        }}>
        <Text style={styles.serviceTitle}>
          <Icon
            name={areCharacteristicsVisible ? 'minus-circle' : 'plus-circle'}
          />{' '}
          {`UUID: ${service.uuid}`}
        </Text>
      </TouchableOpacity>

      {areCharacteristicsVisible &&
        characteristics?.map(char => (
          <CharacteristicCard key={char.id} char={char} />
        ))}
      {descriptors &&
        descriptors.map(descriptor => (
          <DescriptorCard key={descriptor.id} descriptor={descriptor} />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#C1DBB3',
    marginBottom: 12,
    borderRadius: 16,
    shadowColor: 'rgba(60,64,67,0.3)',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 4,
    padding: 12,
  },
  serviceTitle: {
    fontWeight: 'bold',
  },
});

export default ServiceCard;
