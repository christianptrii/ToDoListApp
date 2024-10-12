import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView, RefreshControl } from 'react-native';
import { collection, doc, getDoc, setDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import { FIRESTORE_DB } from "../FirebaseConfig";
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Device from 'expo-device';

export default function HomeScreen() {
  const navigation = useNavigation();
  const firestore = FIRESTORE_DB;
  const [dataList, setDataList] = useState([]);
  const [openItems, setOpenItems] = useState({});
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const toggleItem = (id) => {
    setOpenItems((prevOpenItems) => ({
      ...prevOpenItems,
      [id]: !prevOpenItems[id],
    }));
  };

  const checkDeviceRegistration = async () => {
    try {
      const deviceId = Device.osBuildId || Device.osInternalBuildId;
      const docRef = doc(firestore, 'To Do List', deviceId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const listRef = collection(firestore, 'To Do List', deviceId, 'list');
        const querySnapshot = await getDocs(listRef);
        const fetchedData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDataList(fetchedData);
      } else {
        await setDoc(docRef, { createdAt: new Date() });
        console.log('Device dan sub-koleksi berhasil dibuat');
      }
    } catch (error) {
      console.error('Error checking device registration: ', error);
    }
  };

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await checkDeviceRegistration();
    setRefreshing(false);
  };

  useEffect(() => {
    checkDeviceRegistration();
  }, []);
  const handleDelete = async (id) => {
    try {
      const deviceId = Device.osBuildId || Device.osInternalBuildId;
      const docRef = doc(firestore, 'To Do List', deviceId, 'list', id);
      await deleteDoc(docRef);
      setDataList((prevDataList) => prevDataList.filter((item) => item.id !== id));
      console.log('Item berhasil dihapus');
    } catch (error) {
      console.error('Error deleting item: ', error);
    }
  };
  
  const handleComplete = async (id, currentStatus) => {
    try {
      const deviceId = Device.osBuildId || Device.osInternalBuildId;
      const docRef = doc(firestore, 'To Do List', deviceId, 'list', id);
      await updateDoc(docRef, {
        completed: !currentStatus,
      });
      setDataList((prevDataList) =>
        prevDataList.map((item) =>
          item.id === id ? { ...item, completed: !currentStatus } : item
        )
      );
      console.log('Item status updated');
    } catch (error) {
      console.error('Error updating item status: ', error);
    }
  };
  
  return (
    <View style={styles.container}>
      <Header title="Beranda" />

      {/* Floating Action Button */}
        <TouchableOpacity
            style={[
                styles.fab,
                {
                width: windowWidth * 0.15,
                height: windowWidth * 0.15,
                borderRadius: windowWidth * 0.15,
                bottom: windowHeight * 0.07,
                right: windowWidth * 0.1,
                zIndex: 1,
                position: 'absolute',
                },
            ]}
            onPress={() => {
                navigation.navigate('add');
            }}
        >
            <MaterialIcons name="add" size={24} color="#FFF7F7" />
        </TouchableOpacity>


      {/* Render Data List */}
      <ScrollView
        style={styles.containerScrollView}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {dataList.length > 0 ? (
          dataList.map((item) => (
            <View key={item.id} style={[{ width: windowWidth * 0.9, alignItems: 'center', marginBottom:5 }]}>
              {/* Collapsible Header */}
              <TouchableOpacity
                style={[styles.containerListItem, styles.shadowProp, { width: windowWidth * 0.85, height: windowHeight * 0.1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}
                onPress={() => toggleItem(item.id)}
              >
                <Text style={[styles.titleItemText, item.completed && { textDecorationLine: 'line-through', color: 'gray' }]}>
                    {item.taskName}
                </Text>
                <Ionicons
                  name={openItems[item.id] ? 'chevron-down' : 'chevron-forward-outline'}
                  size={24}
                  color="#6C48C5"
                />
              </TouchableOpacity>

              {/* Collapsible Content */}
              {openItems[item.id] && (
                <View style={[styles.collapsibleContent, { width: windowWidth * 0.85 }]}>
                  <Text style={styles.collapsibleText}>{item.taskDescription}</Text>
                  <View style={{flexDirection:'row', gap:5, marginTop:10}}>
                    <TouchableOpacity
                        style={[styles.buttonItem, { width: windowWidth * 0.4, height: windowHeight * 0.05, paddingStart: windowWidth * 0.1 }]}
                        onPress={() => handleDelete(item.id)}
                    >
                        <Text style={[styles.buttonItemText, { color: '#B8001F' }]}>Hapus</Text>
                        <Ionicons name='trash' size={24} color={'#B8001F'} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.buttonItem, { width: windowWidth * 0.4, height: windowHeight * 0.05, paddingStart: windowWidth * 0.1 }]}
                        onPress={() => handleComplete(item.id, item.completed)}
                    >
                        <Text style={styles.buttonItemText}>{item.completed ? 'Batalkan' : 'Selesai'}</Text>
                        <Ionicons name='checkmark' size={24} color={'#6C48C5'} />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          ))
        ) : (
          <Text>Belum ada rencana yang ditambahkan.</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFF7F7',
  },
  fab: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1230AE',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  containerScrollView: {
    paddingTop: 10,
    flex: 1,
  },
  containerListItem: {
    backgroundColor: '#C68FE6',
    padding: 8,
    borderRadius: 10,
    justifyContent: 'center',
  },
  shadowProp: {
    elevation: 5,
    shadowColor: '#00000',
    shadowOffset: { width: 5, height: 7 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  titleItemText: {
    color: '#6C48C5',
    fontSize: 18,
    fontWeight: 'bold',
  },
  collapsibleContent: {
    backgroundColor: '#EDE7F6',
    padding: 10,
    borderRadius: 5,
  },
  collapsibleText: {
    color: '#6C48C5',
    fontSize: 16,
  },
  buttonItem:{
    alignItems:'center',
    flexDirection:'row',
    alignSelf:'center',
    gap:10,
    borderWidth:2,
    borderColor:'gray',
    borderRadius:10
  },
  buttonItemText:{
    fontSize:17,
    textAlign:'center',
    color:'#6C48C5'
  }
});