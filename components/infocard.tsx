// components/InfoCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface InfoCardProps {
  title: string;
  items: string[];
}


const InfoCard: React.FC<InfoCardProps> = ({ title, items }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      {items.map((item, idx) => (
        <Text key={idx} style={styles.bullet}>• {item}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F2D5FB',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    color: '#7A1FA0',
  },
  bullet: {
    fontSize: 14,
    marginBottom: 4,
    color: '#333',
  },
});

export default InfoCard;
