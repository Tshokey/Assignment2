import React, {useState} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import PronunciationPlayer from '../components/PronunciationPlayer';
import { drugCategory } from '../../resources/resource';

export default function DrugDetailScreen({ route }) {
  const { drug } = route.params;
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{drug.name}</Text>
      <Text style={styles.subtext}>({drug.molecular_formula})</Text>
      <Text style={styles.categories}>
        Categories: {drug.categories.map(id => drugCategory[id]?.name || id).join(', ')}
      </Text>
      <Text style={styles.desc}>{drug.desc}</Text>

      <FlatList
        data={drug.sounds}
        keyExtractor={(item) => `${item.gender}-${item.file}`}
        renderItem={({ item, index }) => (
          <PronunciationPlayer 
            label={drug.name} 
            sound={item.file} 
            gender={item.gender} 
            isOpen={openIndex === index}
            onOpen={() => setOpenIndex(index)}
            onClose={() => setOpenIndex(null)}
         />
       )}
     />

      <TouchableOpacity style={styles.studyButton}>
        <Text style={styles.studyText}>STUDY</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 10,
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    textAlign: 'center', 
  },
  subtext: { 
    marginTop: 15,
    textAlign: 'center', 
    fontSize: 13, 
  },
  categories: { 
    marginTop: 10, 
    textAlign: 'center', 
  },
  desc: { 
    marginTop: 10, 
    fontSize: 15, 
    textAlign: 'justify',
  },
  studyButton: {
    backgroundColor: '#4287f5', 
    padding: 15, 
    marginTop: 20, 
    borderRadius: 8,
  },
  studyText: { 
    color: 'white', 
    textAlign: 'center', 
    fontWeight: 'bold',
  },
});
