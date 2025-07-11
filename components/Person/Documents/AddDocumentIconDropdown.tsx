import { Icons } from '@/constants/Icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { StyleSheet, Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";

interface IAddDocumentIconDropdownProps {
    onChange?: (icon: string) => void;
}

export function AddDocumentIconDropdown({
    onChange
}: IAddDocumentIconDropdownProps) {
    const iconList = Icons
    return (
        <SelectDropdown
            data={iconList}
            onSelect={(selectedItem) => {
                onChange?.(selectedItem);
            }}
            renderButton={(selectedItem, isOpened) => {
                return (
                    <View style={styles.dropdownButtonStyle}>
                        {selectedItem && (
                            <MaterialIcons color={'#000000'} size={24} name={selectedItem} style={styles.dropdownItemIconStyle} />
                        )}
                        <Text style={styles.dropdownButtonTxtStyle}>
                            {selectedItem || "Select an icon"}
                        </Text>
                        <MaterialIcons color={'#000000'} size={24} name={isOpened ? "expand-less" : "expand-more"} style={styles.dropdownItemIconStyle} />
                    </View>
                );
            }}
            renderItem={(item, _, isSelected) => {
                return (
                    <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: "#FFFFFF" }) }}>
                        <MaterialIcons color={'#000000'} size={24} name={item} style={styles.dropdownItemIconStyle} />
                        <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
                    </View>
                );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
            search
            searchInputStyle={styles.dropdown2SearchInputStyle}
            searchInputTxtColor={'#151E26'}
            searchPlaceHolder={'Search here'}
            searchPlaceHolderColor={'#72808D'}
            renderSearchInputLeftIcon={() => {
                return <MaterialIcons color={'#000000'} size={24} name={'search'} style={styles.dropdownItemIconStyle} />

            }}
        />
    )
}
const styles = StyleSheet.create({
    dropdownButtonStyle: {
        width: '100%',
        height: 50,
        backgroundColor: "#FFFFFF",
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: "#000000",
        borderRadius: 12,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 12,
    },
    dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: "500",
        color: "#151E26",
    },
    dropdownButtonArrowStyle: {
        fontSize: 28,
    },
    dropdownButtonIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
    dropdownMenuStyle: {
        backgroundColor: "#FFFFFF",
        borderColor: "#000000",
        borderRadius: 8,
    },
    dropdownItemStyle: {
        width: "100%",
        flexDirection: "row",
        paddingHorizontal: 12,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: "500",
        color: "#151E26",
    },
    dropdownItemIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
    dropdown2SearchInputStyle: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#B1BDC8',
    },
});