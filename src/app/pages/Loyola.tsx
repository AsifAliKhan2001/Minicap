import { Center } from "@gluestack-ui/themed";
import { useEffect } from "react";
import { useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@gluestack-ui/themed";

const Loyola = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: "Loyola" });
  }, [navigation]);

  return (
    <SafeAreaView>
      <Center h="$full">
        <Text size="xl">Loyola</Text>
      </Center>
    </SafeAreaView>
  );
};

export default Loyola;
