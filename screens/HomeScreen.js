import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Button,
  KeyboardAvoidingView,
  FlatList
} from 'react-native';

const avatarURL = username => "https://avatars.io/twitter/" + username
const Header = props => {
  return (
    <View style={styles.header}>
      <Image
        style={styles.headerAvatar}
        source={{uri: avatarURL("jamonholmgren")}}
      />
      <Text style={styles.headerTitle}>Home</Text>
    </View>
  )
}

const Tweet = props => {
  return (
    <View style={styles.tweet}>
      <Image
        style={styles.tweetAvatar}
        source={{uri: avatarURL(props.username)}}
      />
      <Text style={styles.tweetbody}>{props.body}</Text>
    </View>
  )
}

const initialTweets = [
  {
    id: 0,
    username: "jamonholmgren",
    body: "Hey, twitter peeps!!!"
  },
  {
    id: 1,
    username: "jamonholmgren",
    body: "This is a great class"
  }
]

export default function HomeScreen() {
  const [tweets, setTweets] = useState(initialTweets)
  const [currentText, setCurrentText] = useState("")
  const [id, setId] = useState(2)

  const sendTweet = () => {
    const newTweet = {
      id,
      username: "jamonholmgren",
      body: currentText,
    }
    setTweets(tweets.concat([newTweet]))
    setCurrentText("")
    setId(id + 1)
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height" enabled>
      <Header />
      <FlatList
        data={tweets}
        renderItem={({item}) => {
          return <Tweet
            username={item.username}
            body={item.body}
          />
        }}
        keyExtractor={item => item.id.toString()}
      />
      <View style={styles.tabBarInfoContainer}>
        <TextInput
          style={styles.composeTweet}
          value={currentText}
          onChangeText={setCurrentText}
        />
        <Button
          style={styles.sendButton}
          title={"Send"}
          onPress={sendTweet}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use
        useful development tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    padding: 20,
    flexDirection: "row"
  },
  composeTweet: {
    flex: 5,
    height: 40,
    fontSize: 14,
    borderWidth: 0.5,
    borderColor: "#DEDEDE",
    borderRadius: 10
  },
  sendButton: {
    flex: 1
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  header: {
    marginTop: 20,
    height: 90,
    padding: 20,
    borderBottomColor: "#CDCDCD",
    borderBottomWidth: 0.5,
    flexDirection: "row"
  },
  headerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    padding: 20,
    marginRight: 50
  },
  tweet: {
    fontSize: 14,
    flexDirection: "row",
    padding: 10
  },
  tweetAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15
  },
  tweetbody: {
    flex: 1,
    marginLeft: 10,
    padding: 5,
    fontSize: 15
  }

});
