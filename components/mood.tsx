import Slider from '@react-native-community/slider';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const moodEmojis = ['😡', '😟', '😐', '🙂', '😄'];

const MoodSlider = () => {
  const [moodIndex, setMoodIndex] = useState(2);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mood Today</Text>

      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={4}
        step={1}
        value={moodIndex}
        onValueChange={setMoodIndex}
        minimumTrackTintColor="#8c2353"
        maximumTrackTintColor="#ba67c7"
        thumbTintColor="#8c2353"
      />

      <View style={styles.emojiRow}>
        {moodEmojis.map((emoji, index) => (
          <Text
            key={index}
            style={[
              styles.emoji,
              moodIndex === index && styles.selectedEmoji,
            ]}
          >
            {emoji}
          </Text>
        ))}
      </View>
      

      {/* <Text style={styles.selectedText}>Current Mood: {moodEmojis[moodIndex]}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color:'white',
    fontWeight:'bold',
    fontFamily:'cursive'
  },
  slider: {
    width: '100%',
    height: 30,
    color:''
   
  },
  emojiRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '75%',
    paddingHorizontal: 10,
    
    right:20,
  },
  emoji: {
    fontSize: 20,
    opacity: 1,
  },
  selectedEmoji: {
    opacity: 1,
    transform: [{ scale: 1.2 }],
  },
});

export default MoodSlider;