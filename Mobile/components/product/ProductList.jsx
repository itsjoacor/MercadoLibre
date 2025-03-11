import { FlatList } from "react-native";
import ProductItem from "./ProductCard";

const ProductList = ({ products, onNextPage}) => {
	return (
		<FlatList
			data={products}
			renderItem={({ item }) => <ProductItem product={item} />}
			onEndReached={onNextPage}
			onEndReachedThreshold={0.5}
			showsVerticalScrollIndicator={false}
			numColumns={2}
		/>
	);
};

export default ProductList;
