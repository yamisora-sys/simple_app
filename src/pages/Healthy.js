import {View, Text, StyleSheet, FlatList, SectionList, ImageBackground} from 'react-native';
import {fruits_vegetables, workouts} from '../data/healthy.js';
import {useState} from 'react';
import CustomItem from '../components/customitem.js';

export default function Healthy() {

    const [workout, setWorkout] = useState(workouts);

    const [selWorkout, setSelWorkout] = useState([]);

    const [selFruit, setSelFruit] = useState([]);
    let result = selWorkout.concat(selFruit);
    const select = (name, arr, func) => {
        if (arr.includes(name)){
            func(arr.filter((item) => item != name));
        }
        else{
            func([...arr, name]);
        }
    }

    const isSelect = (name, arr) => {
        return arr.includes(name);
    }
    return (
        <View style={styles.container}>
            <View style={styles.workout}>
                <ImageBackground source={{uri:'https://wallpapers.com/images/hd/aesthetic-cat-pictures-e5to7560s6qklp0i.jpg'}} style={styles.workout}>
                <Text style={styles.header}>FlatList workouts</Text>
                <FlatList
                    data={workout}
                    header={<Text>Header</Text>}
                    renderItem={({item}) => <CustomItem item={item.type} func={()=>{
                        select(item.type, selWorkout, setSelWorkout);}}
                        isSelected={isSelect(item.type, selWorkout)}
                        />}
                    keyExtractor={(item) => item.id}
                />
                </ImageBackground>
            </View>

            <View style={styles.fruit}>
                <ImageBackground source={{uri:'https://wallpapers.com/images/hd/aesthetic-cat-pictures-e5to7560s6qklp0i.jpg'}}>
                <Text style={styles.header}>SectionList fruits & vegetables</Text>
                <SectionList
                    sections={fruits_vegetables}
                    renderItem={({item}) => <CustomItem item={item} func={()=>{select(item, selFruit, setSelFruit)}} isSelected={isSelect(item, selFruit)}/>}
                    renderSectionHeader={({section}) => <Text style={styles.title}> {section.title} </Text>}
                    keyExtractor={(item, index) => index}
                />
                </ImageBackground>
            </View>
            <View style={styles.selectItem}>
                <Text style={styles.header2}>Selected Exercises:</Text>
                <Text style={styles.result}>{result.join(', ')}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    title:{
        color: 'white',
        fontSize: 20,
        margin: 10,
    },
    container: {
        marginTop: 50,
        width: '80%',
    },
    header: {
        color: 'hotpink',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    header2: {
        color:"red",
        fontSize: 16,
        fontWeight: 'bold',
    },
    selectItem: {
        alignItems: 'center',
        marginTop: 20,
    },
    workout:{
        backgroundSize: 'contain',
        height: 300,
        marginBottom: 10,
    },
    fruit:{
        backgroundSize: 'contain',
        height: 300,
        marginBottom: 10,
    },
    result:{
        textAlign: 'center',
    }
})

