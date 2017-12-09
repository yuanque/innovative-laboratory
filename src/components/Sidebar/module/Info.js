import React, { Component } from 'react';
import '../Side.scss'
import head from '../../../routes/Login/components/0824ab18972bd40790e0d4b571899e510fb30956.jpg'
import message from '../img/message.png'
import setting from '../img/setting.png'
import out from '../img/退出.png'
import arrow from '../img/htb－Arrow right02.png'
import item from '../img/item13.png'
import login from '../img/登录.png'
import {browserHistory} from 'React-router'

class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      state: this.props.state
    }
  }

  login(){
    browserHistory.push({
      pathname:`/login`
    })
  }

  toSet(e){
    e.preventDefault()
    browserHistory.push({
      pathname:'/setting'
    })
  }

  render() {
    return (
      <div className='info'>
        <div className="user">
          <img src={head} alt="" />
        </div>
        <div className="con_list">
          <a href="" className="list_item">
            <img src={message} alt="" className='icon' />
            <span className='txt'>Message</span>
            <img src={arrow} alt="" className='arrow' />
          </a>
          <a href="" className="list_item" onClick={(e)=>this.toSet(e)}>
            <img src={setting} alt="" className='icon' />
            <span className='txt'>Setting</span>
            <img src={arrow} alt="" className='arrow' />
          </a>
          <a href="" className="list_item">
            <img src={item} alt="" className='icon' />
            <span className='txt'>Item</span>
            <img src={arrow} alt="" className='arrow' />
          </a>
          <a href="" className="list_item">
            {this.state.state == 1 ?
              <div>
                <img src={out} alt="" className='icon' />
                <span className='txt'>Logout</span>
                <img src={arrow} alt="" className='arrow' />
              </div>
              : <div onClick={(e)=>this.login()} style={{display:'block',width:'100%',height:40}}>
                <img src={login} alt="" className='icon' />
                <span className='txt'>Login</span>
                <img src={arrow} alt="" className='arrow' />
              </div>}
          </a>
        </div>
      </div>
    );
  }
}

export default Info;