import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, TouchableWithoutFeedback, Keyboard, ImageBackground, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { setLogin } from '../Redux/LoginReducer';
import { useDispatch, useSelector } from 'react-redux';
import { Camera, CameraType } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { ref, child, getDownloadURL, uploadBytes, onValue } from "firebase/storage";
import { storage } from '../config/firebaseConfig';
import { Button } from '@rneui/base';
import { uid } from 'uid';
import { fethData, UpdateData, fethDataValue } from '../service/getDataUser';



const Profile = () => {
    const user = useSelector(state => state.LoginReducer.payload.username)
    const navigate = useNavigation();
    const dispath = useDispatch();

    const Option = [
        {
            id: 1,
            img: require('../Icon/Profile1.png'),
            description: 'Change password'
        },
        {
            id: 2,
            img: require('../Icon/Profile2.png'),
            description: 'Addresses'
        },
        {
            id: 3,
            img: require('../Icon/Profile3.png'),
            description: 'Cart'
        },
        {
            id: 4,
            img: require('../Icon/Profile4.png'),
            description: 'Favourite'
        },
        {
            id: 5,
            img: require('../Icon/Profile5.png'),
            description: 'Notification'
        },
        {
            id: 6,
            img: require('../Icon/Profile6.png'),
            description: 'Payment Method'
        },
    ]

    const list = [
        {
            id: 1,
            img: require('../Icon/Profile7.png'),
            description: 'Settings'
        },
        {
            id: 2,
            img: require('../Icon/Profile8.png'),
            description: 'Log Out'
        },
    ]

    const handleClick = (id) => {
        if (id == 2) {
            const arr = {};
            dispath(setLogin(arr));
        }

    }

    const handleOption = (id) => {
        if (id == 1) {
            navigate.navigate('ChangePassword')

        }
        if (id == 2) {
            navigate.navigate('Tracker')
        }
        if (id == 3) {
            navigate.navigate('MyOders')
        }
        if (id == 4) {
            navigate.navigate('Favouriter')
        }
        if(id == 5) {

        }
        if(id == 6) {
            navigate.navigate('Payment' , {total : 0 , address : '' , phone : ''})
            
        }

    }

    const getImage = async () => {
        const data = await fethDataValue(user)
        if (data.img) {
            setImage(data.img)
        }


    }


    useEffect(() => {
        getImage();
    }, [])

    //test camera
    const [image, setImage] = useState(null);
    const [btnSave, setBtnSave] = useState(false)

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setBtnSave(true)
        }
    }
    const handleUpload = async () => {
        const storageRef = ref(storage, `img/${uid()}`);
        const response = await fetch(image);
        const blob = await response.blob();
        await uploadBytes(storageRef, blob)
        const photoURL = await getDownloadURL(storageRef)
        console.log('link', photoURL);
        const data = await fethData(user);
        await UpdateData(data, { img: photoURL })
        setBtnSave(false)

    }
    const [isLoading, setIsLoading] = useState(true);

    const handleOnLoad = () => {
        setIsLoading(false);
    };


    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity onPress={() => navigate.navigate('Home')} style={styles.menu}>
                        <Image source={require('../Icon/Back.png')} />
                    </TouchableOpacity>
                    <View style={styles.headerContent}>
                        <Text style={{ color: '#1A1817', fontWeight: 500, fontSize: 20 }}>Menu Profile</Text>
                    </View>
                </View>

                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.menu}>
                        <Text>...</Text>
                    </TouchableOpacity>

                </View>

            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.body}>

                    <View style={{ gap: 10, flexDirection: 'row', alignItems: 'center', gap: 20 }}>
                        {!image && <TouchableOpacity style={styles.avatar} onPress={pickImage}>
                            <Text style={{ fontSize: 20, color: '#fff' }}>+</Text>
                        </TouchableOpacity>}

                        {image &&

                            <TouchableOpacity style={styles.imgLoading} onPress={pickImage}>
                                {isLoading && <ActivityIndicator style={styles.loading} size="small" color="#ccc" />}

                                <Image source={{ uri: image }}
                                    style={{ width: 100, height: 100, borderRadius: 50 }}
                                    onLoad={handleOnLoad}
                                />
                            </TouchableOpacity>

                        }

                        <View style={{ gap: 10 }}>
                            <Text style={{ fontSize: 20 }}>{user}</Text>
                            <Text style={{ fontSize: 14, color: '#ccc' }}>I love fast food</Text>
                        </View>
                    </View>

                    {btnSave &&
                        <Button onPress={() => handleUpload()} buttonStyle={{ borderRadius: 10, paddingVertical: 15 }}>Save</Button>
                    }

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    </View>


                    <View style={{ borderRadius: 20, backgroundColor: '#F0F5FA', marginBottom: 20 }}>
                        {Option.map((item, index) => (
                            <TouchableOpacity onPress={() => handleOption(item.id)} key={index} style={styles.Item}>
                                <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
                                    <Image source={item.img} />
                                    <Text style={{ fontSize: 20 }}>{item.description}</Text>

                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                    <Image source={require('../Icon/Vector.png')} />
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View style={{ borderRadius: 20, backgroundColor: '#F0F5FA', marginBottom: 20 }}>

                        {list.map((item, index) => (
                            <TouchableOpacity onPress={() => handleClick(item.id)} key={index} style={[styles.Item]}>
                                <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
                                    <Image source={item.img} />
                                    <Text style={{ fontSize: 20 }}>{item.description}</Text>

                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                    <Image source={require('../Icon/Vector.png')} />
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>




                </View>
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        gap: 20
    },
    header: {
        marginTop: 60,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between'


    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    menu: {
        width: 45,
        height: 45,
        backgroundColor: '#ECF0F4',
        borderRadius: 50,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    headerContent: {
        flexDirection: 'column'
    },
    Item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: '#F0F5FA',
        height: 85,
        paddingHorizontal: 20
    },
    body: {
        gap: 20
    },
    avatar: {
        backgroundColor: '#ccc',
        width: 100,
        height: 100,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imgLoading: {
        position: 'relative'
    },
    loading: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        alignItems: 'center'

    }
})
export default Profile;