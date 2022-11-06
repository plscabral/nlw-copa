import { Platform } from 'react-native';

//@native-base
import { useTheme } from 'native-base'

// libs
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { PlusCircle, SoccerBall } from 'phosphor-react-native'

// screens
import { NewPool } from '../screens/NewPool';
import { Pools } from '../screens/Pools';
import { FindPool } from '../screens/FindPool';
import { DetailsPool } from '../screens/DetailsPool';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  const { colors, sizes } = useTheme()

  const size = sizes[6];

  return (
    <Navigator screenOptions={{
      headerShown: false,
      tabBarLabelPosition: 'beside-icon',
      tabBarActiveTintColor: colors.yellow[500],
      tabBarInactiveTintColor: colors.gray[300],
      tabBarStyle: {
        position: 'absolute',
        height: sizes[22],
        borderTopWidth: 0,
        backgroundColor: colors.gray[800]
      },
      tabBarItemStyle: {
        position: 'relative',
        top: Platform.OS === 'android' ? -10 : 0
      }
    }}>
      <Screen
        name="newPool"
        component={NewPool}
        options={{
          tabBarIcon: ({ color }) => <PlusCircle color={color} size={size} />,
          tabBarLabel: "Novo bolão"
        }}
      />

      <Screen
        name="pools"
        component={Pools}
        options={{
          tabBarIcon: ({ color }) => <SoccerBall color={color} size={size} />,
          tabBarLabel: "Meus bolões"
        }}
      />

      <Screen
        name="findPools"
        component={FindPool}
        options={{ tabBarButton: () => null }}
      />

      <Screen
        name="detailsPool"
        component={DetailsPool}
        options={{ tabBarButton: () => null }}
      />
    </Navigator>
  )
}