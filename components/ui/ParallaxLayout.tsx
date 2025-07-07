import { PropsWithChildren } from "react";
import { Image, StyleSheet } from "react-native";
import ParallaxScrollView from "../ParallaxScrollView";

export default function ParallaxLayout({
    children
}: PropsWithChildren<{}>) {
    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#000000' }}
            headerImage={
                <Image
                    source={require('@/assets/images/splash-icon.png')}
                    style={styles.reactLogo}
                />
            }>
            {children}
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    reactLogo: {
        height: '100%',
        width: '15%',
        left: 0,
        bottom: 0,
        margin: 'auto'
    },
});
