import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FC } from 'react';
import { MainTabs } from './MainTabs';

export type RootStackParamList = {
  MainTabs: undefined;
  AuthPlaceholder: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack: FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="MainTabs"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="AuthPlaceholder" component={AuthPlaceholderScreen} />
    </Stack.Navigator>
  );
};

const AuthPlaceholderScreen: FC = () => {
  return null;
};
