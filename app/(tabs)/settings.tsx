import React, { useState } from 'react';
import SettingsView from '../../components/SettingsView';
import { USERS } from '../../constants';

export default function SettingsScreen() {
  const [users, setUsers] = useState(USERS);

  return <SettingsView users={users} setUsers={setUsers} />;
}
