import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FC } from 'react';
import { DailyChallengeScreen } from '../screens/DailyChallengeScreen';
import { DailyPromptScreen } from '../screens/DailyPromptScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

export type MainTabsParamList = {
  DailyPrompt: undefined;
  DailyChallenge: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<MainTabsParamList>();

export const MainTabs: FC = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="DailyPrompt"
        component={DailyPromptScreen}
        options={{ title: 'Prompt' }}
      />
      <Tab.Screen
        name="DailyChallenge"
        component={DailyChallengeScreen}
        options={{ title: 'Challenge' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
};
