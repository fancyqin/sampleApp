import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import reducer from '../reducers';

const middlewares = [thunk];
export default function configStore() {
    const store = createStore(reducer, {}, applyMiddleware(...middlewares))
    return store
}