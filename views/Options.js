import React from 'react'
import { ScrollView, View, TouchableWithoutFeedback as Touchable } from 'react-native'
import { Title, Subtitle, Text } from '../components/common/Text'
import GradientButton from '../components/common/GradientButton'
import Colors from '../components/common/Colors'

const Subtitl = (props) => <Subtitle style={{ marginBottom: 30, marginTop: 22 }}>{props.children}</Subtitle>
const OptionButton = (props) => <Touchable
    onPress={props.onPress}
><View style={{
    margin: 18,
    marginTop: 8,
    borderRadius: 48, 
    marginBottom: 36,
    alignItems: 'center', 
padding: 18,
backgroundColor: props.selected? Colors.accentBright: 'transparent',
paddingLeft: 24, paddingRight: 24, 
}}><Text style={{...props.style}}>{props.name}</Text></View></Touchable>


//TODO: make states
class Options extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            topping: true,
            tea: true
        }
    }
    render() {
        return (
            <ScrollView style={styles.container} contentContainerStyle={styles.containerContainer}>
                <Title>
                    Make Your Drink
                    </Title>
                <Subtitl>
                    Tea
                </Subtitl>
                <View style={{ flexDirection: 'row' }}>
                    <OptionButton name="Jasmine"  onPress={()=>this.setState({tea: true})} selected={this.state.tea}/>
                    <OptionButton name="None"  selected={!this.state.tea} onPress={()=>this.setState({tea: false})} />
                    <OptionButton name="House Black Tea" style={{ color: 'grey' }}  selected={false}/>

                </View>
                <Subtitl>
                    Milk
                </Subtitl>
                <View style={{ flexDirection: 'row' }}>
                    <OptionButton name="Whole Milk" style={{ color: 'grey' }}  selected={false}/>
                    <OptionButton name="Soy Milk" style={{ color: 'grey' }}  selected={false}/>
                    <OptionButton name="None"  selected={true}/>
                </View>
                <Subtitl>
                    Topping
                </Subtitl>
                <View style={{ flexDirection: 'row' }}>
                    <OptionButton name="Boba" selected={this.state.topping} onPress={()=>this.setState({topping: true})} />
                    <OptionButton name="None"  selected={!this.state.topping} onPress={()=>this.setState({topping: false})} />
                </View>
                <Subtitl>
                    Sweetness
                </Subtitl>
                 <View style={{ flexDirection: 'row' }}>
                    <OptionButton name="0%" selected={true} />
                    <OptionButton name="50%" style={{ color: 'grey' }}  selected={false}/>
                    <OptionButton name="100%" style={{ color: 'grey' }}  selected={false}/>
                    <OptionButton name="150%" style={{ color: 'grey' }}  selected={false}/>
                </View>
                <GradientButton
                    style={{ ...styles.shadow }}
                    gradientEnd={Colors.accent}
                    textStyle={{ fontSize: 20 }}
                    gradientBegin={Colors.accent}
                    gradientEnd={Colors.accentBright}
                    gradientDirection="diagonal"
                    height={60}
                    width={300}
                    radius={33}
                    onPressAction={() => { this.props.next(this.state) }}>
                    Next
                </GradientButton>
                <View style={{height: 30}}/>
            </ScrollView>)
    }
}

const styles = {
    container: {
        // flex: 1,
        padding: 18,
        height: 20
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
    containerContainer: {
        alignItems: 'center',
    }
}
export default Options