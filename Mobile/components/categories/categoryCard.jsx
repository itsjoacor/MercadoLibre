import { TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import React, { useState } from "react";

const CategoryCard = ({ categoryName, icon, onPress }) => {
	const [isPressed, setIsPressed] = useState(false);

	return (
		<TouchableOpacity
			style={[
				styles.categoryContainer,
				isPressed && styles.categoryContainerHover,
			]}
			onPressIn={() => setIsPressed(true)}
			onPressOut={() => setIsPressed(false)}
			onPress={onPress}
		>
			{React.cloneElement(icon, {
				size: 40,
				color: isPressed ? "#26559c" : "#3483fa",
			})}
			<Text style={styles.categoryName}>{categoryName}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	categoryContainer: {
		padding: 16,
		backgroundColor: "#FFFFFF",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.1,
		shadowRadius: 6,
		elevation: 4,
		borderRadius: 8,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		height: 106,
		width: 178,
		gap: 8,
		margin: 8,
		display: "flex",
	},
	iconCategories: {
		size: 40,
	},
	categoryContainerHover: {
		backgroundColor: "#f6f6f6",
	},
	iconCategoriesHover: {
		color: "#26559c",
	},
	categoryName: {
		fontSize: 18,
		color: "#000000",
	},
});

export default CategoryCard;
