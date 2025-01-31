import { Center } from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@gluestack-ui/themed";

const ClassSchedule = () => {
  return (
    <SafeAreaView className="safe-area-view">
      <Center className="centered-container">
        <Text className="heading-2xl">Class Schedule</Text>
      </Center>
    </SafeAreaView>
  );
};

export default ClassSchedule;
