import SideBar from '@/components/navigation/SideBar';
import React from 'react';
import { View, StyleSheet } from 'react-native';


interface TemplateProps {
    route: {
        params: {
            id: number
        };
    };
    user: number;
    handleLogout: () => void;
    
}
const Template: React.FC<TemplateProps>  = ({user, route}) => {
    return (
        <View style={styles.container}>
            <View style={styles.sidebar}>
                <SideBar  user={user}/>
            </View>
            <View style={styles.content}>
                {/* Main content goes here */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 2,
        flexDirection: 'row',
        
    },
    sidebar: {
        flex: 2000,
        backgroundColor: 'gray',
    },
    content: {
        flex: 3,
        backgroundColor: 'white',
    },
});

export default Template;