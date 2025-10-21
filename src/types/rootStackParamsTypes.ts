import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  BottomTabNavigation: NavigatorScreenParams<BottomTabParamList>;
};

export type BottomTabParamList = {
  AllTasks: undefined;
  CompletedTask: undefined;
  ImportantTask: undefined;
};
