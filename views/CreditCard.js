import React from 'react'

import { ActivityIndicator, Alert, Text, TextInput, TouchableWithoutFeedback, View, Keyboard } from 'react-native';
import { immersiveModeOn } from 'react-native-android-immersive-mode'
import TextInputMask from 'react-native-text-input-mask';
import { Subtitle, Text as SmallText, Title } from '../components/common/Text'
import Colors from '../components/common/Colors'
import GradientButton from '../components/common/GradientButton'
import SpecialGB from '../components/common/SpecialGB'

const cleanDigits = (text) => text.replace(/\D/g, '')

class CreditCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            number: '',
            expiration: '',
            cvc: '',
            isSubmitting: false
        }
    }

    componentDidMount() {
        this.kbl = Keyboard.addListener('keyboardDidHide', immersiveModeOn)
    }
    componentWillUnmount() {
        this.kbl.remove()
    }
    saveName = name => this.setState({ name })
    saveNumber = (_, number) => this.setState({ number })
    saveExpiration = (_, expiration) => this.setState({ expiration })
    saveCVC = cvc => this.setState({ cvc: cleanDigits(cvc) })

    submit = async () => {
        // block and then send to server
        this.setState({ isSubmitting: true })
        let self = this
         await   this.props.createDrink(() => {
             
            this.setState({isSubmitting: false}); 
            Alert.alert(
                'Thanks for your order!',
                'It\'ll be ready soon 🍵',
                [
                  {text: 'Cool!', onPress: ()=>{immersiveModeOn();self.props.next()}}
                ],
                {cancelable: false},
              );
           } ,(err => Alert.alert('Error creating your drink', 'Please try again later')))
            
        // wait and then move onto next
    }

    render() {
        return (
            <View style={{
                alignItems: 'center',
                flex: 1,
                flexDirection: 'column',

                padding: 10,
                paddingTop: 30,
            }}>
                <Title style={{ textAlign: 'center' }}>
                    Payment Information
                </Title>
                <View
                    style={{
                        backgroundColor: 'white',
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 0,
                        },
                        shadowOpacity: 0.34,
                        shadowRadius: 6.27,
                        elevation: 10,

                        width: 400,
                        borderRadius: 8,
                        margin: 10,
                        padding: 15,
                        paddingTop: 30,
                        paddingBottom: 33,
                        marginTop: 28
                    }}>
                    <TextInput
                        value={this.state.name}
                        onChangeText={this.saveName}
                        placeholder="Name"
                        underlineColorAndroid="#34cdd7"
                        multiline={false}
                    />
                    <TextInputMask
                        value={this.state.number}
                        onChangeText={this.saveNumber}
                        mask={'[0000] [0000] [0000] [0000]'}
                        placeholder="Card Number"
                        maxLength={19}
                        autoCompleteType="cc-number"
                        multiline={false}
                        keyboardType="numeric"
                        underlineColorAndroid="#34cdd7"
                        multiline={false}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ alignSelf: 'flex-end', justifyContent: 'flex-start', flexDirection: 'row', alignContent: 'center' }}>
                            <Text style={{ paddingTop: 12 }}>Expiry </Text>
                            <TextInputMask
                                placeholder="  /"
                                value={this.state.expiration}
                                onChangeText={this.saveExpiration}
                                mask={'[00]/[00]'}
                                maxLength={5}
                                multiline={false}
                                keyboardType="numeric"
                                underlineColorAndroid={Colors.accent} />
                        </View>
                        <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
                            <TextInput
                                value={this.state.cvc}
                                onChangeText={this.saveCVC}
                                autoCompleteType="cc-csc"
                                placeholder="CVV"
                                keyboardType="numeric"
                                underlineColorAndroid="#34cdd7"
                                style={{ color: '#FFFFFFDD' }}
                                multiline={false}
                                maxLength={4} />
                        </View>
                    </View>
                </View>
                <SpecialGB
                        gradientEnd={'transparent'}
                        style={{marginTop: 30}}
                        textStyle={{ fontSize: 20 }}
                        gradientBegin={'transparent'}
                        gradientDirection="diagonal"
                        height={20}
                        onPressAction={this.state.isSubmitting? ()=>{}:this.props.back}
                    >
                        <SmallText style={{ textAlign: 'center', color: this.state.isSubmitting?'transparent':Colors.accent }}>
                        📝 Change your mind? Edit your order
                        </SmallText>
                    </SpecialGB>
                <View style={{
                    flex: 1,
                    textAlign: 'center',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                    <GradientButton
                        style={{
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 0,
                            },
                            shadowOpacity: 0.34,
                            shadowRadius: 6.27,
                            elevation: 10,
                        }}
                        gradientEnd={Colors.accent}
                        textStyle={{ fontSize: 20 }}
                        gradientBegin={Colors.accent}
                        gradientEnd={Colors.accentBright}
                        gradientDirection="diagonal"
                        height={60}
                        width={300}
                        radius={33}
                        onPressAction={this.state.isSubmitting? ()=>{} : this.submit}
                    >
                        {this.state.isSubmitting ?
                                <ActivityIndicator size="small" color="#FFFFFFDD" /> : 'Finish'}
                    </GradientButton>
                </View>
            </View>
        )
    }
}


export default CreditCard