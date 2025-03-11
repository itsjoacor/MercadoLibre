import { Dimensions, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { getAuthUser, toggleLike } from "@/services/user.service";
import { Star } from "lucide-react-native";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { router } from "expo-router";

const { width } = Dimensions.get("window"); 

const ProductCard = ({ product }) => {
	const [isLiked, setIsLiked] = useState(false);
	const [user, setUser] = useState(null);

	const { token, updateUser } = useContext(AuthContext);

	const fetchUser = async () => {
		const res = await getAuthUser();
		setUser(res);
	};

	useEffect(() => {
		if (token) {
			fetchUser();
		}
	}, [token]);

	useEffect(() => {
		if (user) {
			const liked = user?.likedProducts?.some(
				(liked) => liked.id === product.id
			);
			setIsLiked(liked);
		}
	}, [user]);

	const handleLike = () => {
		if (!user) {
			router.push("/(tabs)/user");
			return;
		}
		toggleLike(product.id);
		setIsLiked(!isLiked);
		updateUser();
	};

	return (
		<View style={styles.pageCard}>
			<Pressable onPress={handleLike} style={styles.iconBox}>
				{isLiked ? (
					<Star fill={"#fde047"} size={40} />
				) : (
					<Star color={"#000"} size={40} />
				)}
			</Pressable>

			<Pressable
				style={styles.productBox}
				onPress={() => {
					router.push(`/product/${product.id}`);
				}}
			>
				<Image source={{ uri: product.images[0] }} style={styles.image} />
				<View style={styles.separator} />
				<View>
					<Text style={styles.tittleText}>{product?.title}</Text>
					<Text style={styles.ownerText}>{`Por ${product.owner.name}`}</Text>
					<View style={styles.priceBox}>
						<Text style={styles.priceText}>{`$ ${product.price.toFixed(
							2
						)}`}</Text>
						<Text style={styles.installmentsText}>{`En 12 cuotas de $${(
							product.price / 12
						).toFixed(2)}`}</Text>
					</View>
				</View>
			</Pressable>
		</View>
	);
};

export default ProductCard;

const styles = StyleSheet.create({
	pageCard: {
		width: (width / 2) - 24, 
		padding: 16,
		backgroundColor: "#FFFFFF",
		marginBottom: 4,
		marginHorizontal: 3, 

		shadowColor: "#000",
		shadowOffset: { width: 0, height: 10 },
		shadowOpacity: 0.1,
		shadowRadius: 15,

		borderWidth: 2,
		borderColor: "#bfbfbf",
		borderRadius: 10,
		overflow: "hidden",
	},
	iconBox: {
		position: "absolute",
		top: 20,
		right: 10,
		padding: 10,
		backgroundColor: "#FFFFFF",
		borderRadius: 20,
		elevation: 3,
	},
	separator: {
		borderBottomColor: "#000",
		borderBottomWidth: 1,
		marginVertical: 10,
		width: "100%",
	},
	tittleText: {
		fontWeight: "medium",
		fontSize: 14,
		maxWidth: "100%",
	},
	ownerText: {
		color: "#9ca3af",
		fontSize: 12,
	},
	priceBox: {
		paddingTop: 12,
	},
	priceText: {
		fontWeight: "normal",
		fontSize: 14,
	},
	installmentsText: {
		color: "#00A650",
		fontSize: 12,
	},
	productBox: {
		marginTop: 50,
	},
	image: {
		width: "100%", 
		height: 150, 
		resizeMode: "contain",
	},
});
