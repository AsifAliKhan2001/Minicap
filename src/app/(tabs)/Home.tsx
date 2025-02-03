import { Center, VStack, Text } from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  return (
    <SafeAreaView>
      <Center h="$full">
        <VStack space="sm" alignItems="center">
          <Text size="xl" textAlign="center">
            Welcome to{"\n"}
            the Concordia{"\n"}
            Student Navigation App
          </Text>
        </VStack>
      </Center>
    </SafeAreaView>
  );
};

export default Home;
