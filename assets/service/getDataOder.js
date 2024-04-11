import { ref, child, onValue, get, update } from "firebase/database";
import { database } from '../config/firebaseConfig'


const fethDataKey = async (username) => {
    try {
        const data = await get(ref(database, 'buy'))
        // const data = await get(child(ref(database), 'users').key);

        const reponse = data.val();
        // const dataArray = Object.values(reponse); 
        for (let key in reponse) {
            if (reponse[key]['username'] == username) {
                return key
            }

        }

    } catch (err) {
        console.log(err)

    }

}

const UpdateData = async (uid, data) => {
    try {
        const userRef = ref(database, `buy/${uid}`);
        await update(userRef, data)

    } catch (err) {
        console.log(err)
    }
}

const fethDataValue = async (username) => {
    try {
        const data = await get(ref(database, 'buy'))
        // const data = await get(child(ref(database), 'users').key);

        const reponse = data.val();
        // const dataArray = Object.values(reponse); 
        for (let key in reponse) {
            if (reponse[key]['username'] == username) {
                return reponse[key]
            }

        }

    } catch (err) {
        console.log(err)

    }

}
export { fethDataKey, UpdateData, fethDataValue }