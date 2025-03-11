import React, { useContext, useEffect, useState } from "react";
import { getCart } from "../../services/cart.service";
import { useNavigation } from "expo-router";
import { getAuthUser } from "../../services/user.service";
import UserCart from "../../components/cart/userCart";
import EmptyCart from "../../components/cart/emptyCart";
import { AuthContext } from "../../context/AuthContext";

export default function CartTab() {
	const [user, setUser] = useState(null);
	const [cart, setCart] = useState({items:[]});
	const [updated, setUpdated] = useState(false);
	const navigation = useNavigation();
	const { token, updateUser } = useContext(AuthContext);
	

	useEffect(() => {
		if(token){
			const fetchUser = async () => {
				try {
					const res = await getAuthUser();
					setUser(res);
				} catch (error) {
					console.error("Error al obtener al usuario:", error);
					navigation.navigate("index");
				}
			};
			fetchUser();
		}
		else{
			setUser(null);
			setCart({items:[]});
		}
	}, [token]);
	
	useEffect(() => {
		if (user) {
			const fetchCart = async () => {
				try {
					const res = await getCart();
					setCart(res);
					
				} catch (error) {
					console.error("Error al obtener el carrito:", error);
				} 
			};
			fetchCart();
		}
	}, [user]);

	useEffect(() => {
		if (updated) {
			const fetchCart = async () => {
				const res = await getCart();
				setCart(res);
			};
			setUpdated(false);
			fetchCart();
		}
	}, [updated]);

	return user && cart.items.length > 0 ? (
		<UserCart cart={cart} setUpdated={setUpdated} />
	) : (
		<EmptyCart />
	);
}
