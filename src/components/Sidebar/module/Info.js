import React, { Component } from 'react'
import { Tooltip,message } from 'antd'
import '../Side.scss'
import head from '../img/message.png'
import Message from '../img/message.png'
import setting from '../img/setting.png'
import out from '../img/退出.png'
import arrow from '../img/htb－Arrow right02.png'
import item from '../img/item13.png'
import login from '../img/登录.png'
import { browserHistory } from 'React-router'
import { BASE_URL, POST } from '../../commonModules/POST'

class Info extends Component {
  constructor (props) {
    super(props)
    this.state = {
      state: 0,
      img:''
    }
  }

  login () {
    browserHistory.push({
      pathname:`/login`
    })
  }

  getHeadImg(){
    POST('/QueryIMG', `param=''`, (re) => {
      if (re.state == 1) {
        if(re.data==null){
          this.setState({img:''})
        }else{
          this.setState({ img: re.data.headImg })
          this.setState({ state: 1 });
        }                
      } else {
        alert('服务器错误')
      }
    })
  }

  componentDidMount() {
    this.getHeadImg()
  }


  toSet (e) {
    e.preventDefault()
    browserHistory.push({
      pathname:'/personal'
    })
  }

  toMail=(e) => {
    e.preventDefault()
    browserHistory.push({
      pathname:'/mail'
    })
  }
  //退出
  loginOut = () => POST('/user/exitLogin','',re=>{
    if(re.state==1){
      message.success('退出成功')
      this.getHeadImg()
      this.setState({state:0})
    }else{
      message.error('服务器错误')
    }
  })

  toPersonal=() => browserHistory.push({ pathname:'/Personal' })

  render () {
    return (
      <div className='info'>
        <div className='user' onClick={this.toPersonal.bind(this)}>
          <Tooltip title='点击进入个人中心'>
          <img src={this.state.img ? `${BASE_URL}${this.state.img}`:head} alt='' />
        </Tooltip>
        </div>
        <div className='con_list'>
          <a href='' className='list_item' onClick={this.toMail.bind(this)}>
            <img src={Message} alt='' className='icon' />
            <span className='txt'>消息</span>
            <img src={arrow} alt='' className='arrow' />
          </a>
          <a href='' className='list_item' onClick={(e) => this.toSet(e)}>
            <img src={setting} alt='' className='icon' />
            <span className='txt'>个人中心</span>
            <img src={arrow} alt='' className='arrow' />
          </a>
          {/* <a href="" className="list_item">
            <img src={item} alt="" className='icon' />
            <span className='txt'>Item</span>
            <img src={arrow} alt="" className='arrow' />
          </a>*/}
          <span href='' className='list_item'>
            {this.state.state == 1
              ? <div onClick={(e) => this.loginOut()} style={{ display: 'block', width: '100%', height: 40, cursor: 'pointer' }}>
                <img src={out} alt='' className='icon' />
                <span className='txt'>Logout</span>
                <img src={arrow} alt='' className='arrow' />
              </div>
              : <div onClick={(e) => this.login()} style={{ display:'block', width:'100%', height:40,cursor:'pointer' }}>
                <img src={login} alt='' className='icon' />
                <span className='txt'>Login</span>
                <img src={arrow} alt='' className='arrow'/>
              </div>}
          </span>
        </div>
      </div>
    )
  }
}

export default Info
