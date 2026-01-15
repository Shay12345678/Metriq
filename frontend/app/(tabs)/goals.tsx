import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

const goals = [
  {
    id: "muscle",
    title: "Muscle Gain",
    subtitle: "Build strength and size",
    color: "#22c55e"
  },
  {
    id: "fatloss",
    title: "Fat Loss",
    subtitle: "Lean down efficiently",
    color: "#38bdf8"
  },
  {
    id: "balanced",
    title: "Balanced",
    subtitle: "Maintain & stay healthy",
    color: "#facc15"
  }
];

export default function GoalsScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#020617",
        padding: 24
      }}
    >
      {/* Header */}
      <Text
        style={{
          fontSize: 32,
          fontWeight: "800",
          color: "white",
          marginTop: 40
        }}
      >
        Choose your goal
      </Text>

      <Text
        style={{
          color: "#94a3b8",
          marginTop: 8,
          marginBottom: 30
        }}
      >
        This helps us tailor your meals
      </Text>

      {/* Goal Cards */}
      {goals.map((goal) => (
        <TouchableOpacity
          key={goal.id}
          onPress={() =>
            router.push({
              pathname: "/(tabs)/generate",
              params: { goal: goal.id }
            })
          }
          style={{
            backgroundColor: "#020617",
            borderWidth: 1,
            borderColor: goal.color,
            borderRadius: 20,
            padding: 20,
            marginBottom: 18
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              color: goal.color
            }}
          >
            {goal.title}
          </Text>

          <Text
            style={{
              color: "#94a3b8",
              marginTop: 6
            }}
          >
            {goal.subtitle}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
