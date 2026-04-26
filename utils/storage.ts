import AsyncStorage from '@react-native-async-storage/async-storage';

export type ExperimentRecord = {
  id: string;
  date: string;
  energy: string;
  focus: string;
  title: string;
  feeling: string;
};

const STORAGE_KEY = 'mindlab_records';

export async function getRecords(): Promise<ExperimentRecord[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    return JSON.parse(raw) as ExperimentRecord[];
  } catch (error) {
    console.error('Error reading records:', error);
    return [];
  }
}

export async function saveRecord(record: ExperimentRecord): Promise<void> {
  try {
    const current = await getRecords();

    const isDuplicate = current.some((r) => {
      const sameContent =
        r.title === record.title &&
        r.energy === record.energy &&
        r.focus === record.focus &&
        r.feeling === record.feeling;

      const timeDiff = Math.abs(
        new Date(r.date).getTime() - new Date(record.date).getTime()
      );

      return sameContent && timeDiff < 5000;
    });

    if (isDuplicate) return;

    const updated = [record, ...current];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error saving record:', error);
  }
}

export async function clearRecords(): Promise<void> {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing records:', error);
  }
}