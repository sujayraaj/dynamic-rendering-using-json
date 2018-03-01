import React, { Component } from 'react';
import './App.css';
import ComponentMap from './Map';
import RenderData from './data';

const createMarkup = (uiObj,key)=> {
    const props = uiObj.props || {};
    const children = uiObj.children;
    console.log(ComponentMap[uiObj.type]);
    console.log(uiObj.type);
    console.log(props);
    return  React.createElement(ComponentMap[uiObj.type] || uiObj.type,{...props,key},typeof children !== "undefined" ?  typeof children === "string" ? children : children.map((val,ind)=> createMarkup(val,ind)):null);
}; 

class App extends Component {
    render() {
        return createMarkup(RenderData);
    }
}

export default App;

