import {Button, Text} from 'react-native';

export default function Test({onBack}) {
    return (
        <>
            <Text accessibilityRole="header">测试页</Text>
            <Text>{process.env.EXPO_PUBLIC_APP_ENV ?? 'development'}</Text>
            <Button title="返回首页" onPress={onBack} />
        </>
    );
}
