import React from 'react';
import {Text, View} from 'react-native';
import {useSelector} from 'react-redux';

const Home = () => {
  const {user} = useSelector(state => state.user);

  console.log(user);
  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
};

export default Home;
