import {Button, Text} from 'react-native';

export default function Index({onOpen}) {
    return (
        <>
            <Text accessibilityRole="header">首页</Text>
            <Button title="打开测试页" onPress={onOpen} />
        </>
    );
}
