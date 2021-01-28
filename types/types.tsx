import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';

export interface Session {
  id: string;
  totalJumps: number;
  lapAmount: number;
  progress: number;
  progressText: string;
  startTime: number;
  endTime: number;
  status: Status;
}
type Status = 'complete' | 'active' | 'empty';

export type RootTabParamList = {
  Home: undefined;
  Sessions: { shouldUpdate: boolean } | undefined;
  About: undefined;
};

export type HomeScreenTabProp = BottomTabNavigationProp<
  RootTabParamList,
  'Home'
>;
export type HomeScreenRouteProps = RouteProp<RootTabParamList, 'Home'>;

export type SessionsScreenTabProp = BottomTabNavigationProp<
  RootTabParamList,
  'Sessions'
>;
export type SessionsScreenRouteProps = RouteProp<RootTabParamList, 'Sessions'>;
