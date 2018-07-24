import React, { Component} from 'react';
import FacebookProvider, { CustomChat } from 'react-facebook';
 
export default class Chatbox extends Component {
  render() {
    return (
      <FacebookProvider appId="781307525384702">
        <CustomChat  pageId="153353938664134" minimized={false}/>
      </FacebookProvider>    
    );
  }
}