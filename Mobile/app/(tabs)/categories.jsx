import { useEffect, useState } from "react";
import { getAllCategories } from "@/services/categories.service";
import  CategoriesList  from "@/components/categories/categoriesList";
import { View } from "react-native";



export default function Categories() {

	const [categories, setCategories] = useState([]);

	const fetchCategories = async () => {
		const data = await getAllCategories();
		setCategories(data);
	};


	useEffect(() => {
		fetchCategories();
	}, []);

	return (
		<View>
			<CategoriesList categories={categories} />
		</View>
	);
}
