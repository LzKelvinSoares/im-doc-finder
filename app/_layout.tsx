import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { ProvidePeople } from '@/providers';
import { SQLiteProvider, type SQLiteDatabase } from 'expo-sqlite';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SQLiteProvider databaseName="imdoc.db" onInit={migrateDbIfNeeded}>
        <ProvidePeople>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="users/[id]" />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </ProvidePeople>
      </SQLiteProvider>
    </ThemeProvider>
  );
}

interface MigrationResult {
  user_version: number;
}

async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 1;
  let data = await db.getFirstAsync<MigrationResult | null>(
    'PRAGMA user_version'
  );
  let currentDbVersion = data?.user_version ?? 0;
  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }
  if (currentDbVersion === 0) {
    await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS people (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL);
        CREATE TABLE IF NOT EXISTS documents (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, url TEXT NOT NULL, icon TEXT NOT NULL, personId INTEGER NOT NULL, FOREIGN KEY (personId) REFERENCES people(id) ON DELETE CASCADE);
    `);
    await db.runAsync('INSERT INTO people (name) VALUES (?)', 'Kelvin');
    currentDbVersion = 1;
  }
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}
