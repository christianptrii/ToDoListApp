import Ionicons from '@expo/vector-icons/Ionicons';
import { PropsWithChildren, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, useColorScheme, ViewStyle  } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';

interface CollapsibleProps extends PropsWithChildren {
  title: string;
  style?: ViewStyle;  // Menambahkan properti style opsional
  contentStyle?: ViewStyle; // Menambahkan properti style opsional untuk konten collapsible
}

export function Collapsible({ children, title, style, contentStyle }: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? 'light';

  return (
    <ThemedView style={style}> {/* Menggunakan style yang diterima sebagai prop */}
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}>
        <Ionicons
          name={isOpen ? 'chevron-down' : 'chevron-forward-outline'}
          size={18}
          color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
        />
        <Text style={styles.textTitle}>{title}</Text>
      </TouchableOpacity>
      {isOpen && (
        <ThemedView style={[styles.content, contentStyle]}> {/* Menambahkan style untuk konten collapsible */}
          {children}
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
  textTitle:{
    color:'#6C48C5',
    fontSize:18,
    fontWeight:'bold'
  }
});
