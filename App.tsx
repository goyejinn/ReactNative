import React, {useState, useRef, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';

interface Message {
  id: string;
  text: string;
  createdAt: Date;
  isSender: boolean;
}

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const flatListRef = useRef<FlatList<Message>>(null); // FlatList의 ref 생성

  const sendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage: Message = {
        id: Math.random().toString(),
        text: inputMessage,
        createdAt: new Date(),
        isSender: true,
      };
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setInputMessage('');
    }
  };

  const renderMessage = ({item}: {item: Message}) => (
    <View
      style={[
        styles.messageContainer,
        item.isSender ? styles.sender : styles.receiver,
      ]}>
      <Text
        style={[
          styles.messageText,
          item.isSender ? styles.senderText : styles.receiverText,
        ]}>
        {item.text}
      </Text>
    </View>
  );

  // 메시지가 추가될 때마다 FlatList를 스크롤
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({animated: true, offset: 0});
    }
  }, [messages]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}> {'  <    '} 채팅방</Text>
      </View>
      <FlatList
        ref={flatListRef} // ref를 FlatList에 연결
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messageList}
        inverted={false}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputMessage}
          onChangeText={setInputMessage}
          placeholder="메시지를 입력하세요..."
          keyboardType="default"
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>전송</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9bbbd4',
  },
  header: {
    backgroundColor: '#9bbbd4',
    padding: 20,
    paddingTop: 30,
    //alignItems: 'center',
  },
  headerText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
  messageList: {
    padding: 10,
  },
  messageContainer: {
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  sender: {
    color: 'black',
    backgroundColor: '#fef01b',
    alignSelf: 'flex-end',
  },
  receiver: {
    color: 'black',
    backgroundColor: 'white',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  senderText: {
    color: 'black',
  },
  receiverText: {
    color: 'black',
  },
  inputContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    backgroundColor: '#eee',
    borderColor: '#ccc',
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#eee',
    borderRadius: 20,
    padding: 10,
  },
  sendButtonText: {
    color: '#556677',
  },
});

export default App;
