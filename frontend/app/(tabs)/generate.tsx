import { View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import { useState, useEffect } from "react";

export default function GenerateScreen() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [ingredients, setIngredients] = useState<{ name: string; quantity?: string; nutrients?: any[] }[]>([]);

  // Fetch USDA foods from backend
  useEffect(() => {
    if (query.length === 0) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`http://localhost:3000/search?q=${query}`);
        const data = await res.json();
        console.log("Search results:", data);
        setSearchResults(data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    }, 300); // debounce 300ms

    return () => clearTimeout(timer);
  }, [query]);

  const addIngredient = (name: string, nutrients: any[]) => {
    if (ingredients.find((i) => i.name === name)) return;
    setIngredients([...ingredients, { name, nutrients }]);
    setQuery("");
    setSearchResults([]);
  };

  const removeIngredient = (name: string) => {
    setIngredients(ingredients.filter((i) => i.name !== name));
  };

  const updateQuantity = (name: string, qty: string) => {
    setIngredients(ingredients.map((i) => (i.name === name ? { ...i, quantity: qty } : i)));
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#020617", padding: 24 }}>
      <Text style={{ fontSize: 28, fontWeight: "800", color: "white", marginBottom: 8 }}>Build your meal</Text>
      <Text style={{ color: "#94a3b8", marginBottom: 16 }}>Search USDA foods and add to your list</Text>

      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search ingredients"
        placeholderTextColor="#64748b"
        style={{
          backgroundColor: "#020617",
          borderWidth: 1,
          borderColor: "#1e293b",
          borderRadius: 14,
          padding: 14,
          color: "white",
          marginBottom: 12
        }}
      />

      {/* Search Results */}
      {searchResults.length > 0 && (
        <View style={{ marginBottom: 16, maxHeight: 200 }}>
          {searchResults.map((food) => (
            <TouchableOpacity
              key={food.id}
              onPress={() => {
                console.log("Adding ingredient:", food.name);
                addIngredient(food.name, food.nutrients);
              }}
              style={{
                paddingVertical: 10,
                borderBottomWidth: 1,
                borderBottomColor: "#1e293b"
              }}
            >
              <Text style={{ color: "white" }}>{food.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}


      {/* Ingredient List */}
      <FlatList
        data={ingredients}
        keyExtractor={(item) => item.name}
        ListEmptyComponent={<Text style={{ color: "#64748b", marginTop: 20 }}>No ingredients added yet</Text>}
        renderItem={({ item }) => (
          <View style={{ borderWidth: 1, borderColor: "#1e293b", borderRadius: 14, padding: 14, marginBottom: 12 }}>
            <Text style={{ color: "white", fontWeight: "600" }}>{item.name}</Text>

            {/* Quantity input */}
            <TextInput
              placeholder="Quantity (grams, optional)"
              placeholderTextColor="#64748b"
              keyboardType="numeric"
              value={item.quantity}
              onChangeText={(text) => updateQuantity(item.name, text)}
              style={{
                marginTop: 8,
                borderWidth: 1,
                borderColor: "#1e293b",
                borderRadius: 10,
                padding: 10,
                color: "white"
              }}
            />

            <TouchableOpacity onPress={() => removeIngredient(item.name)} style={{ marginTop: 10 }}>
              <Text style={{ color: "#ef4444", fontWeight: "600" }}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Generate Meals button */}
      {ingredients.length > 0 && (
        <TouchableOpacity
          style={{
            backgroundColor: "#22c55e",
            paddingVertical: 16,
            borderRadius: 18,
            alignItems: "center",
            marginTop: 10
          }}
        >
          <Text style={{ color: "#020617", fontWeight: "700", fontSize: 16 }}>Generate Meals</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
