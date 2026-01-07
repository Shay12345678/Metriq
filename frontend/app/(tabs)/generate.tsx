import { View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";

export default function Generate() {
  const [goal, setGoal] = useState("balanced");
  const [meal, setMeal] = useState<any>(null);

  const getMeal = async () => {
    const res = await fetch(`http://localhost:3000/meal?goal=${goal}`);
    const data = await res.json();
    setMeal(data);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#020617", padding: 24 }}>
      <Text style={{ color: "white", fontSize: 24, fontWeight: "700" }}>
        Your Goal
      </Text>

      <View style={{ flexDirection: "row", marginVertical: 20 }}>
        {["muscle", "fatloss", "balanced"].map(g => (
          <TouchableOpacity
            key={g}
            onPress={() => setGoal(g)}
            style={{
              backgroundColor: goal === g ? "#22c55e" : "#0f172a",
              padding: 12,
              borderRadius: 14,
              marginRight: 10
            }}
          >
            <Text style={{ color: goal === g ? "#020617" : "white" }}>
              {g.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        onPress={getMeal}
        style={{
          backgroundColor: "#22c55e",
          padding: 16,
          borderRadius: 18,
          alignItems: "center"
        }}
      >
        <Text style={{ fontWeight: "700", color: "#020617" }}>
          Generate Meal
        </Text>
      </TouchableOpacity>

      {meal && (
        <View style={{
          marginTop: 30,
          backgroundColor: "#0f172a",
          padding: 20,
          borderRadius: 18
        }}>
          <Text style={{ color: "white", fontSize: 18 }}>
            {meal.name}
          </Text>
          <Text style={{ color: "#94a3b8" }}>
            🔥 {meal.calories} cal
          </Text>
          <Text style={{ color: "#94a3b8" }}>
            💪 {meal.protein}g protein
          </Text>
        </View>
      )}
    </View>
  );
}
