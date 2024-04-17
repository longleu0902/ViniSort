import { ref, child, onValue, get, update } from "firebase/database";
import { database } from '../config/firebaseConfig'


const fethData = async (username) => {
    try {
        const data = await get(ref(database, 'users'))
        const reponse = data.val();
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
        const userRef = ref(database, `users/${uid}`);
        await update(userRef, data)

    } catch (err) {
        console.log(err)
    }
}

const fethDataValue = async (username) => {
    try {
        const data = await get(ref(database, 'users'))
        const reponse = data.val();
        for (let key in reponse) {
            if (reponse[key]['username'] == username) {
                return reponse[key]
            }

        }

    } catch (err) {
        console.log(err)

    }

}

const fethDataCard = async () => {
    try {
        const data = await get(ref(database, 'cards'))
        const dataArray = Object.values(data.val());
        return dataArray
    } catch (err) {
        console.error(err)
    }
}
export { fethData, UpdateData, fethDataValue, fethDataCard }