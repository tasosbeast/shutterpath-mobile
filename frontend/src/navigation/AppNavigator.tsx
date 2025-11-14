import { NavigationContainer } from '@react-navigation/native';
import { FC } from 'react';
import { RootStack } from './RootStack';

export const AppNavigator: FC = () => {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
};
