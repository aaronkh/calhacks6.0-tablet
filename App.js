import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Colors from './components/common/Colors';
import { immersiveModeOn } from 'react-native-android-immersive-mode'
import { reducer } from './redux/reducers/reducers';
import Swiper from 'react-native-swiper'
import { View, ToastAndroid } from 'react-native'
import Start from './views/Start'
import CreditCard from './views/CreditCard'
import Success from './views/Success'
import Options from './views/Options'
import Snackbar from 'react-native-snackbar'
import AsyncStorage from '@react-native-community/async-storage'
import { catchError } from 'rxjs/operators';

var BASE_URL = 'https://8ea796c0.ngrok.io'
var postOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
}


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

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 0,
            order: [],
            oof: '',
            last_id: 0,
            checker: 'no interval'
        }
        this.getLastId()
        this.scroll = this.scroll.bind(this)
        this.swiper = React.createRef()
    }

    getLastId = async () => {
        try{
            const last_id = await AsyncStorage.getItem('@last_id')
            if(last_id !== null) {
                this.setState({last_id})
            }
            this.refresh(last_id)
            this.setState({checker: setInterval(this.refresh, 3000)})
        } catch(e) {
            // 😠
            console.error(e)
        }
    }

    componentDidMount() {
        immersiveModeOn()
        
    }

    onDrinkFinish() {
        // place last_id into async storage... and also increment last_id
    }

    createDrink() {
        let newArray = [this.state.oof]
        for(let i = 0; i < this.state.order.length; i++) {
            newArray.push(this.state.order[id])
            if(this.state.order[i]['id'] == this.state.last_id)
                break
        }
        this.setState({oof: '', order: newArray})
    }

    refresh = async (l_id) => {
        await fetch(BASE_URL + '/orders')
        .then(res => {
            return res.json()
        })
        .then(res => {
            res = res.reverse()
            // console.error(res)
            let newArray = [] // TODO: sync local stuff
            for(let i = 0; i < res.length; i++) {
                res[i]['car'] = true
                newArray.push(res[i])
                for(let j = 0; j < this.state.order.length; j++)
                if(res[i]['id'] == l_id || res[i]['id'] == this.state.last_id)
                    break 
            }
            let aar = [

            ]
            for(let i = 0; i < newArray.length; i++) aar.push(newArray[i])
            // console.error(newArray)
            this.setState({
                order: aar,
            })
        })
        .catch(err => {
            Snackbar.show({
                title: 'Error refreshing queue.',
                duration: Snackbar.LENGTH_SHORT,
              })
        })
    }


    componentWillUnmount(){
        if(this.state.checker === 'no interval') return
        clearInterval(this.state.checker)
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
                        <Start style={styles.slide} orders={this.state.order} next={this.scroll} />
                        <Options style={styles.slide} next={this.scroll} />
                        <CreditCard style={styles.slide} back={this.back} next={this.toStart} createDrink={this.createDrink}/>
                    </Swiper>
                </View>
            </Provider>
        )
    }
}


export default App
