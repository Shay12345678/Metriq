import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';


useEffect(() => {
  const test = async () => {
    const { data, error } = await supabase.from('test').select()
    console.log(data, error)
  }
  test()
}, [])

export default function HomeScreen() {
  return (
    <View style={styles.container}>

      {/* Header */}
      <LinearGradient
        colors={['#0D0D0D', '#1a1a1a']}
        style={styles.header}
      >
        <Text style={styles.title}>MetriqPro</Text>
        <Text style={styles.subtitle}>Fuel your goals. Smarter.</Text>
      </LinearGradient>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.body}>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionCard}>
            <Text style={styles.actionText}>Build a Meal</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <Text style={styles.actionText}>Track Macros</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Section */}
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>Today's Summary</Text>
          <Text style={styles.goalText}>Goal: Muscle Gain</Text>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Calories</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>0g</Text>
              <Text style={styles.statLabel}>Protein</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>0g</Text>
              <Text style={styles.statLabel}>Carbs</Text>
            </View>
          </View>
        </View>

        {/* CTA */}
        <TouchableOpacity style={styles.bigButton}>
          <Text style={styles.bigButtonText}>Generate Perfect Meal →</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  header: {
    paddingTop: 65,
    paddingBottom: 40,
    paddingHorizontal: 24,
  },

  title: {
    fontSize: 34,
    fontWeight: '800',
    color: '#fff',
  },

  subtitle: {
    marginTop: 6,
    color: '#b3b3b3',
    fontSize: 16,
  },

  body: {
    padding: 20,
  },

  quickActions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 30,
  },

  actionCard: {
    flex: 1,
    backgroundColor: '#121212',
    borderRadius: 16,
    paddingVertical: 22,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1f1f1f',
  },

  actionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  statsCard: {
    backgroundColor: '#121212',
    padding: 22,
    borderRadius: 16,
    marginBottom: 26,
    borderWidth: 1,
    borderColor: '#1f1f1f',
  },

  statsTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '700',
  },

  goalText: {
    color: '#888',
    marginTop: 5,
    marginBottom: 18,
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  statBox: {
    alignItems: 'center',
  },

  statValue: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },

  statLabel: {
    color: '#777',
    marginTop: 3,
    fontSize: 12,
  },

  bigButton: {
    backgroundColor: '#E63946',
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
  },

  bigButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
