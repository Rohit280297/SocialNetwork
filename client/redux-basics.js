const redux = require('redux');


const initialState = {
    counter : 0
}
const rootReducer = (state= initialState,action)=>{
    switch(action.type){
        case 'INC_COUNTER':
        return {
            ...state,
            counter: state.counter + 1
        }

        case 'ADD_COUNTER' :
        return{
            ...state,
            counter: state.counter + action.value
        }
    }
    return state;
}


const store = redux.createStore(rootReducer);

store.subscribe(()=>{
    console.log('Subscription :',store.getState());
})

store.dispatch({type: 'INC_COUNTER'});
store.dispatch({type:'ADD_COUNTER', value: 10});
console.log(store.getState());