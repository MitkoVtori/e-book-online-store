import { useEffect, useState } from "react"
import { getMyProfile } from "../../services/userService";


export default function Profile() {


    const [myProfile, setMyProfile] = useState({});

    useEffect( ()=>{
        getMyProfile()
        .then( result => setMyProfile(result))
        .catch(error => console.log(error.message))


    })

    return (
        <h1>Profileeeeee</h1>
    )
}