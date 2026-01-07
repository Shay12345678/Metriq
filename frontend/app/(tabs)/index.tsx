import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter(); // ✅ This fixes the red underline

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#020617", // Dark navy background
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
      }}
    >
      {/* App Title */}
      <Text
        style={{
          fontSize: 44,
          fontWeight: "800",
          color: "#22c55e", // Emerald green brand color
          textAlign: "center",
        }}
      >
        Metriq
      </Text>

      {/* Subtitle / tagline */}
      <Text
        style={{
          color: "#94a3b8", // lighter text
          fontSize: 16,
          textAlign: "center",
          marginVertical: 20,
        }}
      >
        Eat smarter. Train harder.
        {"\n"}Meals built for your goals.
      </Text>

      {/* Generate Meal Button */}
      <TouchableOpacity
        onPress={() => router.push("/generate")} // ✅ relative path works in tabs
        style={{
          backgroundColor: "#22c55e",
          paddingVertical: 16,
          paddingHorizontal: 40,
          borderRadius: 18,
          marginTop: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <Text
          style={{
            color: "#020617",
            fontSize: 16,
            fontWeight: "700",
            textAlign: "center",
          }}
        >
          Generate a Meal
        </Text>
      </TouchableOpacity>

      {/* Optional: small footer text */}
      <Text
        style={{
          color: "#94a3b8",
          fontSize: 12,
          marginTop: 30,
          textAlign: "center",
        }}
      >
        Powered by USDA Nutrition Data
      </Text>
    </View>
  );
}
