import React from 'react'
import { View, ScrollView } from 'react-native'
import { Title, Text, Subtitle } from '../components/common/Text'
import Icon from 'react-native-vector-icons/MaterialIcons'
import GradientButton from '../components/common/GradientButton'
import Colors  from '../components/common/Colors'

const iconMap = {
    default: 'star-border',
    local: 'local-drink',
    car: 'directions-car'
}

const noItem = {
    title: 'No drinks in queue',
    subtitle: 'Order one now! 👉',
    icon: 'default'
}

const Item = (props) =>
    <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 18,
        borderBottomColor: 'rgba(0, 0, 0, 0.2)',
        borderBottomWidth: 1,
    }}>
        <Icon name={iconMap[props.item.icon]} size={40} style={{ marginRight: 18 }} />
        <View>
            <Subtitle>{props.item.title}</Subtitle>
            <Text style={{ color: 'rgba(0, 0, 0 , 0.5)' }}>{props.item.subtitle} </Text>
        </View>

    </View>
const QueueContainer = (props) =>
    <View style={{ ...styles.qContaienr, ...styles.shadow }}>
        {props.items.length ? props.items.map((i, id) => <Item item={i} id={id} />) : <Item item={noItem} />

        }
    </View>


class Start extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    contentContainerStyle={{ alignItems: 'stretch', padding: 12 }}
                    style={styles.lContainer}>
                    <Title style={{ textAlign: 'center' }}>
                        Up Next
                    </Title>
                    <QueueContainer items={[]}>
                    </QueueContainer>
                </ScrollView>
                <View
                    style={styles.rContainer}>
                    <Title style={{ textAlign: 'center', marginBottom: 18 }}>
                        Bobafetch
                        </Title>
                    <Subtitle>
                        On-demand boba milk tea in
                        </Subtitle>
                    <Subtitle>
                        a matter of seconds ✨
                        </Subtitle>
                        <View style={{ flex: 2, justifyContent: 'center'}}>
                    <GradientButton
                        style={{...styles.shadow}}
                        gradientEnd={Colors.accent}
                        textStyle={{ fontSize: 20 }}
                        gradientBegin={Colors.accent}
                        gradientEnd={Colors.accentBright}
                        gradientDirection="diagonal"
                        height={60}
                        width={300}
                        radius={33}
                        onPressAction={this.props.next}
                    >
                        Create Yours
                    </GradientButton>
                    </View>
                </View>

            </View>
        )
    }
}

const styles = {
    container: {
        flex: 1,
        flexDirection: 'row',
        margin: 12
    },
    rContainer: {
        flex: 1,
        padding: 12,
        alignItems: 'center'
    },
    lContainer: {
        // alignItems: 'center',
        flex: 1,

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
    qContaienr: {
        borderRadius: 8,
        backgroundColor: 'white'
    }
}

export default Start