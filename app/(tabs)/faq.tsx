import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform } from 'react-native';
import { View, Text, TextInput, ScrollView, TouchableHighlight} from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  containerMain: {
    paddingTop: 70,
    paddingHorizontal: 25,
    marginBottom : 50,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textdesc: {
    fontSize: 16,
    textAlign: 'justify',
  },
  faqContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 4,
    width: '98%',
  },
  titleFaq: {
    width: '80%',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 15,
  },
  iconback : {
    width: 25,
  },
  titleContainerFaq: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
});

export default function TabTwoScreen() {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [image, setImage] = React.useState();
  const [showFaq, setShowFaq] = React.useState(false);

  const faqData = [
    {
      question: 'Apakah saya harus melakukan diet?',
      description : 'Duis in hac amet. Duis in Duis in hac amet. Duis in  Duis in hac amet. Duis in  Duis in hac amet. Duis in  Duis in hac amet. Duis in '
    },
    {
      question: 'Apakah diet saya harus ketat?',
      description : 'Duis in hac amet. Duis in Duis in hac amet. Duis in  Duis in hac amet. Duis in  Duis in hac amet. Duis in  Duis in hac amet. Duis in ',
      image: require('../../assets/images/bmichart.png')
    },
    {
      question: 'Apakah saya harus melakukan olahraga?',
      description : 'Duis in hac amet. Duis in Duis in hac amet. Duis in  Duis in hac amet. Duis in  Duis in hac amet. Duis in  Duis in hac amet. Duis in '
    },
    {
      question: 'Apakah saya harus mengurangi makanan berlemak?',
      description : 'Duis in hac amet. Duis in Duis in hac amet. Duis in  Duis in hac amet. Duis in  Duis in hac amet. Duis in  Duis in hac amet. Duis in '
    },
    {
      question: 'Apakah saya harus mengurangi makanan manis?',
      description : 'Duis in hac amet. Duis in Duis in hac amet. Duis in  Duis in hac amet. Duis in  Duis in hac amet. Duis in  Duis in hac amet. Duis in '
    },
  ];

  const setFAQ = (question: string) => {
    const faq = faqData.find((faq) => faq.question === question);
    if (faq) {
      setTitle(faq.question);
      setDescription(faq.description);
      setImage(faq.image);
    }
    setShowFaq(true);
  }
  if(!showFaq) {
  return (
    <ScrollView style={styles.containerMain}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Frequently Asked Questions</Text>
      </View>
      <Text style={styles.textdesc}>
        Lorem ipsum dolor sit amet consectetur. Interdum risus quam vulputate tempor mauris diam. Justo tellus nulla aliquet pulvinar iaculis vitae purus viverra. Interdum duis in hac amet.      
      </Text>
      <View style={{marginTop: 50, width: '100%', alignItems : 'center'}}>
        {faqData.map((faq, index) => (
          <TouchableHighlight key={index} style={styles.faqContainer} underlayColor="#f0f0f0" onPress= {() => setFAQ(faq.question)}>
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
              <Text style={{fontSize: 14, fontWeight: 'bold'}}>{faq.question}</Text>
              <Ionicons name="chevron-forward" size={20} color="black" />
            </View>
          </TouchableHighlight>
        ))}
      </View>
    </ScrollView>
  )}else{
    return (
      <ScrollView style={styles.containerMain}>
        <View style={styles.titleContainerFaq}>
          <Ionicons style={styles.iconback} name="chevron-back" size={24} color="black" onPress={() => setShowFaq(false)} />
          <Text style={styles.titleFaq}>{title}</Text>
        </View>
        {image && 
        <View style={{alignItems: 'center'}}>
          <Image source={image} style={{width: 200, height: 200}} />
        </View>
        }
        <Text style={styles.textdesc}>
          {description}
        </Text>
      </ScrollView>
    );
  }
}
