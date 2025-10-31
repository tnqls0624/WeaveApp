import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { User } from '../types';

interface SettingsViewProps {
  users: User[];
  setUsers: (users: User[]) => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ users, setUsers }) => {
  const currentUser = users.find(u => u.id === 'user1');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile</Text>
          {currentUser && (
            <View style={styles.profileCard}>
              <Image source={{ uri: currentUser.avatarUrl }} style={styles.avatar} />
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{currentUser.name}</Text>
                <Text style={styles.profileId}>User ID: {currentUser.id}</Text>
              </View>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Family Members</Text>
          {users.filter(u => u.id !== 'user1').map(user => (
            <View key={user.id} style={styles.memberCard}>
              <Image source={{ uri: user.avatarUrl }} style={styles.memberAvatar} />
              <View style={styles.memberInfo}>
                <Text style={styles.memberName}>{user.name}</Text>
                <View style={[styles.colorBadge, { backgroundColor: getColorHex(user.color) }]}>
                  <Text style={styles.colorBadgeText}>{user.color}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Info</Text>
          <View style={styles.infoCard}>
            <Text style={styles.infoText}>WeaveApp - Family Calendar</Text>
            <Text style={styles.infoSubtext}>Version 1.0.0</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const getColorHex = (colorName: string): string => {
  const colors: { [key: string]: string } = {
    blue: '#3B82F6',
    emerald: '#10B981',
    orange: '#F97316',
    violet: '#8B5CF6',
    gray: '#6B7280',
  };
  return colors[colorName] || colors.gray;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  content: {
    flex: 1,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileInfo: {
    marginLeft: 16,
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  profileId: {
    fontSize: 14,
    color: '#6B7280',
  },
  memberCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  memberAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  memberInfo: {
    marginLeft: 12,
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 4,
  },
  colorBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  colorBadgeText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
  },
  infoText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 4,
  },
  infoSubtext: {
    fontSize: 14,
    color: '#6B7280',
  },
});

export default SettingsView;
