import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Colors from './components/common/Colors';
import { immersiveModeOn } from 'react-native-android-immersive-mode'
import { reducer } from './redux/reducers/reducers';
import Swiper from 'react-native-swiper'
import { View } from 'react-native'
import Start from './views/Start'
import CreditCard from './views/CreditCard'
import Success from './views/Success'
import Options from './views/Options'


const styles = {
    slide: {
        flex: 1,
        backgroundColor: '#AAA'
    },
    container: {
        flex: 1,
    },

    imgBackground: {
        backgroundColor: 'transparent',
        position: 'absolute'
    },

}

const store = createStore(reducer)

const MAX_SCREENS = 4
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 0,
            order: {}
        }
        this.scroll = this.scroll.bind(this)
        this.swiper = React.createRef()
    }

    componentDidMount() {
        immersiveModeOn()
    }

    scroll = (o) => {
        this.swiper.current.scrollBy(1)
        return this.setState({ page: this.state.page + 1, order: o })
    }
    back = () => {
        this.swiper.current.scrollBy(-1)
        this.setState({page: this.state.page + 1})
    }
    toStart=()=>{
        this.swiper.current.scrollBy(this.state.page * -1)
        this.setState({page: 0})
    }
    render() {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <Swiper
                        ref={this.swiper}
                        scrollEnabled={false}
                        horizontal={false}
                        showsPagination={false}
                        style={styles.wrapper}
                        loop={false}>
                        <Start style={styles.slide} next={this.scroll} />
                        <Options style={styles.slide} next={this.scroll} />
                        <CreditCard style={styles.slide} back={this.back} next={this.toStart} />
                    </Swiper>
                </View>
            </Provider>
        )
    }
}


export default App
