import { useEffect } from "react";
import { getCart } from "../../services/bookService";



export default function Cart() {

    useEffect(() => {
        getCart()
            .then(cart => {
                console.log(cart);
            })
            .catch(err => {
                console.log(err.message)
            })
    }, []);
    return(
        <>
        <h1>Твоята количка за пазаруване</h1>
        </>
    )
}