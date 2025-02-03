import { Link, Tabs } from "expo-router";
import { Image } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Box, VStack, HStack, Text, Center, Fab, FabIcon } from "@gluestack-ui/themed";
import Loader from "../../components/Loader";
import { icons, images } from "../../constants";

type TabIconProps = {
  icon: any;
  color: string;
  name: string;
  focused: boolean;
};

const TabIcon: React.FC<TabIconProps> = ({ icon, color, name, focused }) => {
  return (
    <Center>
      <Image
        source={icon}
        resizeMode="contain"
        style={{ width: 24, height: 35, tintColor: color }}
      />
      <Text color={color} fontFamily={focused ? "$heading" : "$body"} size="xs">
        {name}
      </Text>
    </Center>
  );
};

const TabLayout = () => {
  const [loading, setLoading] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <SafeAreaView>
      <VStack h="$full">
        {/* Top Logo Bar */}
        <Box px="$2.5" py="$2.5" bg="$white">
          <Image
            source={images.ConcordiaLOGO}
            resizeMode="contain"
            style={{ width: 250, height: 60 }}
          />
        </Box>

        {/* Main Content (Tabs) */}
        <Box flex={1}>
          <Tabs
            initialRouteName="CampusMap"
            screenOptions={{
              tabBarActiveTintColor: "#FFFFFF",
              tabBarInactiveTintColor: "#CDCDE0",
              tabBarShowLabel: true,
              tabBarStyle: {
                borderTopWidth: 1,
                borderTopColor: "#232533",
                height: 80,
                paddingHorizontal: 10,
                paddingBottom: 10,
                backgroundColor: '#8B0000', // Dark red background
              },
              tabBarItemStyle: {
                paddingVertical: 5,
                flex: 1,
              },
            }}
          >
            <Tabs.Screen
              name="CampusMap"
              options={{
                title: "Campus Map",
                headerShown: false,
                tabBarIcon: ({ color, focused }) => (
                  <TabIcon
                    icon={icons.Campus}
                    color={color}
                    name=""
                    focused={focused}
                  />
                ),
              }}
            />
            <Tabs.Screen
              name="ClassSchedule"
              options={{
                title: "Class Schedule",
                headerShown: false,
                tabBarIcon: ({ color, focused }) => (
                  <TabIcon
                    icon={icons.Calendar}
                    color={color}
                    name=""
                    focused={focused}
                  />
                ),
              }}
            />
            <Tabs.Screen
              name="FindBuilding"
              options={{
                title: "Find Building",
                headerShown: false,
                tabBarIcon: ({ color, focused }) => (
                  <TabIcon
                    icon={icons.searchBuilding}
                    color={color}
                    name=""
                    focused={focused}
                  />
                ),
              }}
            />
            <Tabs.Screen
              name="Menu"
              options={{
                title: "Menu",
                headerShown: false,
                tabBarIcon: ({ color, focused }) => (
                  <TabIcon
                    icon={icons.Hamburger}
                    color={color}
                    name=""
                    focused={focused}
                  />
                ),
              }}
              listeners={{
                tabPress: (e) => {
                  e.preventDefault();
                  setMenuVisible(!menuVisible);
                },
              }}
            />
          </Tabs>
        </Box>

        {/* Menu Overlay */}
        {menuVisible && (
          <Box
            position="absolute"
            bottom="$20"
            right="$0"
            bg="$white"
            py="$2.5"
            px="$5"
            borderRadius="$md"
            minWidth={150}
            shadowColor="$black"
            shadowOffset={{ width: 0, height: 2 }}
            shadowOpacity={0.25}
            shadowRadius={3.84}
            elevation={5}
          >
            <VStack space="md">
              <Link href="/ClassSchedule">
                <Text size="md">Class Schedule</Text>
              </Link>
              <Link href="/pages/Loyola">
                <Text size="md">Loyola Campus</Text>
              </Link>
              <Link href="/pages/SGW">
                <Text size="md">SGW Campus</Text>
              </Link>
              <Link href="/pages/Login">
                <Text size="md">Log In (optional)</Text>
              </Link>
            </VStack>
          </Box>
        )}
      </VStack>

      {loading && <Loader isLoading={loading} />}
    </SafeAreaView>
  );
};

export default TabLayout;
