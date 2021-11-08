import React, {useRef} from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';
import {WebView} from 'react-native-webview';

const App = () => {
  let webviewRef = useRef<any>();

  const html = `
  <html>
  <head></head>
  <body>
    <h1>Listening...</h1>
    <script>
      alert('Are u ready?');

      setTimeout(function () {
        window.ReactNativeWebView.postMessage("Hello!")
      }, 2000);

      document.addEventListener("message", function(data) {
        alert(data);
      });

      window.addEventListener("message", function(data) {
        alert(JSON.stringify(data.data, null, 2));
      });
    </script>
  </body>
  </html>
`;

  // webView.postMessage('Hello from RN');

  const run = `
    document.body.style.backgroundColor = 'blue';
    true;
  `;

  setTimeout(() => {
    webviewRef.current.injectJavaScript(run);
  }, 3000);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableHighlight
        style={{padding: 10, backgroundColor: 'gray', marginTop: 20}}
        onPress={() => {
          // webviewRef.postMessage('Wayne is coming!!!');
          if (webviewRef.current) {
            console.log(webviewRef?.current);
            fetch('https://jsonplaceholder.typicode.com/todos')
              .then(response => response.json())
              .then(json => {
                webviewRef?.current?.postMessage(JSON.stringify(json));
              });
          }
        }}>
        <Text style={{color: 'white'}}>
          Send Data To WebView from React Native
        </Text>
      </TouchableHighlight>
      <WebView
        ref={webviewRef}
        style={styles.webview}
        originWhitelist={['*']}
        source={{html}}
        // source={{html: '<h1>Hello World!</h1>'}}
        // source={{uri: 'https://naver.com'}}
        onMessage={event => {
          const {data} = event.nativeEvent;
          console.log(data);
        }}
        // domStorageEnabled
        // javaScriptEnabled
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    backgroundColor: 'red',
  },
});

export default App;
