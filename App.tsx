import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import TextSize from 'react-native-text-size';
import {Skia} from '@shopify/react-native-skia';

const fontSize = 14;
const textToBeRender = '2024/7/9 14:15:01';

interface Props {}

interface State {
  reactNativeTextSizeWidth: number;
}

export default class App extends React.PureComponent<Props, State> {
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      reactNativeTextSizeWidth: 0,
    };
  }

  componentDidMount() {
    TextSize.measure({
      text: textToBeRender,
      fontSize,
    })
      .then(m => this.setState({reactNativeTextSizeWidth: m.width}))
      .catch();
  }

  render() {
    const {reactNativeTextSizeWidth} = this.state;

    const skParagraph = Skia.ParagraphBuilder.Make()
      .pushStyle({fontSize})
      .addText(textToBeRender)
      .build();
    skParagraph.layout(Number.MAX_VALUE);
    const reactNativeSkiaWidth = skParagraph.getLongestLine();

    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>
          React-Native-Skia: ({reactNativeSkiaWidth})
        </Text>
        <Text
          style={[styles.text, {width: reactNativeSkiaWidth}]}
          numberOfLines={1}>
          {textToBeRender}
        </Text>
        <Text style={styles.header}>
          React-Native-Text-Size: ({reactNativeTextSizeWidth})
        </Text>
        <Text
          style={[styles.text, {width: reactNativeTextSizeWidth}]}
          numberOfLines={1}>
          {textToBeRender}
        </Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
  },
  header: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    color: '#ffffff',
    backgroundColor: '#106191',
  },
});
