import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { studyAPI } from "../API/drugSpeakAPI"; 
import { selectCurrentUser } from "../redux/authSlice";
import { selectCurrentCount, selectFinishedCount, selectTotalScore } from "../redux/learningSlice";

export default function LearningList() {
	const navigation = useNavigation();
	const currentLearning = useSelector(state => state.learning.current);
	const finishedLearning = useSelector(state => state.learning.finished);
	const user = useSelector(selectCurrentUser);
	const currentCount = useSelector(selectCurrentCount);
	const finishedCount = useSelector(selectFinishedCount);

	const userId = user?.id;

	// State for API data
	const [studyRecord, setStudyRecord] = useState(null);
	const [loading, setLoading] = useState(true);

	const [showCurrent, setShowCurrent] = useState(false);
	const [showFinished, setShowFinished] = useState(false);

	const toggleCurrent = () => setShowCurrent(!showCurrent);
	const toggleFinished = () => setShowFinished(!showFinished);

	const fetchStudyRecord = async () => {
		try {
			setLoading(true);
			const response = await studyAPI.getStudyRecord(userId);
			setStudyRecord(response);
			console.log("Study record fetched:", response);
		} catch (error) {
			console.log("No study record found:", error.message);
			// Set default values if no record exists
			setStudyRecord({
				currentLearning: 0,
				finishedLearning: 0,
				totalScore: 0
			});
		} finally {
			setLoading(false);
		}
	};

	// Fetch study record on component mount
	useEffect(() => {
		if (userId) {
			fetchStudyRecord();
		}
	}, [userId]);

	// Refetch data when screen comes into focus
	useFocusEffect(
		React.useCallback(() => {
			if (userId) {
				fetchStudyRecord();
			}
		}, [userId])
	);

	const renderDrug = ({ item }) => (
		<TouchableOpacity
			onPress={() => navigation.navigate('LearningScreen', { drug: item })}
			style={styles.drugItem}>
			<Text>{item.name}</Text>
		</TouchableOpacity>
	);

	// Show loading state
	if (loading) {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>Learning List</Text>
				<Text>Loading...</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			{/* Current Learning */}
			<Text style={styles.title}>Learning List</Text>

			<View style={styles.section}>
				<TouchableOpacity style={styles.header} onPress={toggleCurrent}>
					<Text style={styles.headerText}>
						Current Learning ({studyRecord?.currentLearning || currentCount})
					</Text>
					<Ionicons
						name={showCurrent ? 'remove' : 'add'}
						size={20}
						color="black"
					/>
				</TouchableOpacity>
				{showCurrent && (
					<FlatList
						data={currentLearning}
						keyExtractor={(item) => item.id}
						renderItem={renderDrug}
					/>
				)}
			</View>

			{/* Finished Learning */}
			<TouchableOpacity style={styles.header} onPress={toggleFinished}>
				<Text style={styles.headerText}>
					Finished ({ studyRecord?.finishedLearning || finishedCount})
				</Text>
				<Ionicons
					name={showFinished ? 'remove' : 'add'}
					size={20}
					color="black"
				/>
			</TouchableOpacity>
			{showFinished && (
				<FlatList
					data={finishedLearning}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						
						<View style={styles.drugItem}>
							<Text>{item.name}</Text>
						</View>
					)}
			/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
		backgroundColor: '#fff',
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'left',
		marginTop: 30,
		marginBottom: 10,
	},
	section: {
		marginBottom: 10,
	},
	header: {
		marginTop: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 20,
		borderBottomWidth: 1,
		borderColor: '#ccc',
		backgroundColor: '#f2f2f2',
	},
	headerText: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	drugItem: {
		padding: 10,
		borderRadius: 8,
		borderBottomWidth: 1,
		marginVertical: 1,
	},
});