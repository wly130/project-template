import {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Index from './src/screens/index';
import Test from './src/screens/test';

export default function App() {
    const [testing, setTesting] = useState(false);
    return (
        <View style={styles.screen}>
            {testing ? <Test onBack={() => setTesting(false)} /> : <Index onOpen={() => setTesting(true)} />}
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16},
});
