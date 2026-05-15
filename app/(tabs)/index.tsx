import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-bg-primary">
      <View className="">
        <Text className="text-text-secondary">Home</Text>
      </View>
    </SafeAreaView>
  );
}
