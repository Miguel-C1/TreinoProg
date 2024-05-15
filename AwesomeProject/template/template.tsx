import SideBar from '@/components/navigation/SideBar';
import React from 'react';
import { View, StyleSheet } from 'react-native';

const Template = () => {
    return (
        <View style={styles.container}>
            <View style={styles.sidebar}>
                <SideBar />
            </View>
            <View style={styles.content}>
                {/* Main content goes here */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    sidebar: {
        flex: 10,
        backgroundColor: 'gray',
    },
    content: {
        flex: 3,
        backgroundColor: 'white',
    },
});

export default Template;