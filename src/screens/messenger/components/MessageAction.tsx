import React, { useCallback, useRef, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Images } from '../../../assets';
import RN from '../../../components/RN';
import { smileyEmojis } from '../../../utils/messenger';

const MessageActionSheet = ({ visible, onClose, onSelect, onReact, messageType }) => {
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const emojiFlatListRef = useRef(null);
    const options = [
        { text: 'Edit', action: 'edit', icon: <RN.Image source={Images.Img.editMessage} style={{ width: 17, height: 17 }} /> },
        { text: 'Delete', action: 'delete', icon: <Images.Svg.deleteMessage /> },
    ];

    const handleSelect = useCallback((emoji) => {
        if (onReact) {
            onReact(emoji);
        }
        onClose();
        console.log('emojiemojiemoji', emoji);
    }, [onReact, onClose]);

    const renderItem = useCallback(({ item }) => (
        <TouchableOpacity style={styles.emojiItem} onPress={() => handleSelect(item)}>
            <Text style={styles.emoji}>{item}</Text>
        </TouchableOpacity>
    ), [handleSelect]);

    const loadMoreEmojis = useCallback(() => {
        if (emojiFlatListRef.current) {
            const nextIndex = (currentIndex + 1) % smileyEmojis.length; // Circular scroll
            setCurrentIndex(nextIndex);
            emojiFlatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
        }
    }, [currentIndex]);

    return (
        <Modal
            visible={visible}
            transparent={true}
            onDismiss={onClose}
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableOpacity style={styles.modalBackground} onPress={onClose}>
                <View style={styles.mainContainer}>
                    <View style={styles.emojiContainer}>
                        <FlatList
                            ref={emojiFlatListRef}
                            data={smileyEmojis}
                            showsVerticalScrollIndicator={false}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => `${item}-${index}`}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.emojiList}
                            scrollEnabled={true}
                            style={{ height: 200 }}
                        />
                        <Images.Svg.scrollSmiles style={styles.scrollIcon} onPress={loadMoreEmojis} />
                    </View>
                    <View style={[styles.actionSheet, messageType !== 'text' && {height: '26%'}]}>
                        {options
                            .filter(option => !(option.text === 'Edit' && messageType !== 'text')) // Exclude "Edit" if messageType is not 'text'
                            .map((option) => (
                                <TouchableOpacity
                                    key={option.text}
                                    style={[styles.option, option.text === 'Delete' && { borderBottomWidth: messageType == 'text' ? 0.4 : 0}]}
                                    onPress={() => onSelect(option.action)}
                                >
                                    <Text style={[styles.optionText, option.text === 'Delete' && { color: '#EB5545' }]}>{option.text}</Text>
                                    {option.icon}
                                </TouchableOpacity>
                            ))}
                    </View>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        opacity: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(10, 10, 9, 0.8)',
    },
    mainContainer: {
        gap: 8,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    emojiSelector: {
        height: 150,
        backgroundColor: '#1C1C1E',
        borderBottomColor: '#3C3C43',
        borderBottomWidth: 0.4,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    actionSheet: {
        width: '65%',
        height: '45%',
        backgroundColor: '#000000',
        borderRadius: 20,
        padding: 10,
        shadowColor: 'white',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
    },
    option: {
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        borderBottomColor: '#3C3C43',
        justifyContent: 'space-between',
    },
    optionText: {
        fontSize: 17,
        color: '#FFFFFF',
        letterSpacing: 0.4,
        fontFamily: 'Montserrat-Regular',
    },
    emojiContainer: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
        position: 'relative',
    },
    scrollIcon: {
    },
    emojiList: {
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    emojiItem: {
        paddingVertical: 5,
        alignItems: 'center',
    },
    emoji: {
        fontSize: 30,
    },
});

export default MessageActionSheet;
