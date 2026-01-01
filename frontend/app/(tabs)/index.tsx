import { Text, View } from "react-native";
import { useEffect, useState } from "react";

export default function HomeScreen() {
  const [meal, setMeal] = useState<any>(null);

  useEffect(() => {
    fetch("http://192.n168.1.72:3000/meal") // 👈 your computer IP
      .then(res => res.json())
      .then(data => setMeal(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 28, fontWeight: "bold" }}>Metriq</Text>

      {meal && (
        <>
          <Text>{meal.name}</Text>
          <Text>{meal.calories} cal</Text>
          <Text>{meal.protein}g protein</Text>
        </>
      )}
    </View>
  );
}
