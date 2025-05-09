import React , {useState} from "react";
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import { useDispatch } from "react-redux";
import { finishDrug, removeDrug } from "../redux/learningSlice";
import PronunciationPlayer from "../components/PronunciationPlayer";
import {drugCategory} from '../../resources/resource';

export default function LearningScreen({route, navigation}) {
    const {drug} = route.params;
    const [openIndex, setOpenIndex] = useState(null);
    const dispatch = useDispatch();

    const handleFinish =() => {
        dispatch(finishDrug(drug.id));
        navigation.goBack();
    };

    const handleRemove=()=> {
        dispatch(removeDrug(drug.id));
        navigation.goBack();
    };

    return(
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

            <View style={styles.recordContainer}>
                <View style={styles.recordButton}>
                    <Text style={styles.recordText}>Hold to Record</Text>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleFinish} style={styles.finishButton}>
                    <Text style={styles.buttonText}>FINISH</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleRemove} style={styles.removeButton}>
                    <Text style={styles.buttonText}>REMOVE</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
      flex: 1, 
      padding: 10,
      marginBottom: 40,
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
    recordContainer: {
        alignItems: 'center',
        marginVertical: 10,
        backgroundColor: 'white',
    },
    recordButton:{
        backgroundColor: '#e0564c',
        borderRadius: 100,
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    recordText: {
        color: 'white',
        fontWeight: '400',
        fontSize: 12,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    finishButton: {
        backgroundColor: '#4287f5',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
    },
    removeButton: {
        backgroundColor: '#4287f5',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
    },
    buttonText: { 
        color: 'white', 
        textAlign: 'center', 
        fontWeight: 'bold',
      },
});