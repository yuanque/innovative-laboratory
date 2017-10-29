import React, { Component } from 'react';
import './Register.scss'
import {POST1} from '../../../components/commonModules/POST'
import {message} from 'antd'

class Register extends Component {

  constructor(props) {
    super(props);
    this.state={
      name:'name',
      phone:12345678,
      mail:'1111',
      passwd:'12345',
      confirm:'12345',
      idcode:0    
    }
  }

  //信息验证，刷新
  changeValue(value,type){
    let len=value.length
    switch(type){
      case 1:
      {
        this.setState({name:value});
        
        if(len>6 || len==0){
          this.refs.name.style.display='inline'
        }else{
          this.refs.name.style.display='none'
        }
        break;
      }
        case 2:
        {
          this.setState({phone:value});

          if(len!=11){
          this.refs.phone.style.display='inline'
          }else{
          this.refs.phone.style.display='none'
          }
          break;
        }
        case 3:
        {
          this.setState({mail:value});    
          break;
        }
        case 4:
        {
          if(len<6||len>10){
            this.refs.pass.style.display='inline'
          }else{
            this.setState({passwd:value});
             this.refs.pass.style.display='none'
            break;
          }
        }
        case 5:
        {
          this.setState({confirm:value});
          let pass=this.state.passwd
          if(value!=pass){
             this.refs.pass2.style.display='inline'
          }else{
             this.refs.pass2.style.display='none'
          }
          break;
        }
        case 6:
        POST1('/mailSure',`identifyCode=${value}`,(re) => {
          if(re.state==0){
            message.error('服务器错误')
          }else if(re.state==-1){
            this.refs.idcode.style.display='inline'
            message.error('验证码错误')
          }else{
            this.refs.idcode.style.display='none'
            this.setState({idcode:1})
          }
        })
    }
  }

  onSubmit(type){
    let {name,phone,mail,passwd}=this.state
    let data=`name=${name}&email=${mail}&phone=${phone}&password=${passwd}`

    if(type==1){
    POST1('/register',data,(re) => {
      console.log(re)
      switch(re.State){
        case 1:
        message.success('注册成功')
        break;
        case 0:
        message.error('服务器错误')
        break;
        case -2:
        message.error('邮箱已注册，请更换邮箱')
        break;
        case -1:
        message.error('用户名已被占用，请重新设置用户名')
        break;
        case -3:
        message.error('手机已注册')
      }
        
    })}else if(type==0){
      POST1('/mailRegister',`email=${mail}`,(re) => {
        this.setState({idcode:re.state})
        if(!re.state){
          message.error('服务器错误')
        }
      })
    }else{

    }
  }

  render() {
   const style1={
      color:'#f74f4f',
      display:'none',
    }

    return (

      <div className='register'>
        <div className="regbox">

        <h1 className="title">注册</h1>

       <div className='inpbox'>
       <p>昵称：</p>
       <input 
       type="text" 
       className="inp" 
       placeholder='请输入昵称，小于六个字' 
       onBlur={(e)=>this.changeValue(e.target.value,1)}/>
       <i className='fa fa-times fa-1x' style={style1} ref='name'></i>
       </div>

        <div className='inpbox'>
        <p>手机号：</p>
        <input 
        type="text" 
        className="inp" 
        placeholder='请输入您的手机号' 
        onBlur={(e)=>this.changeValue(e.target.value,2)}/>
        <i className='fa fa-times fa-1x' style={style1} ref='phone'></i>
        </div>

        <div className='inpbox'>
        <p>邮箱：</p>
        <input 
        type="text" 
        className="inp" 
        placeholder='请输入您常用的邮箱' 
        onBlur={(e)=>this.changeValue(e.target.value,3)}/>
        <i className='fa fa-times fa-1x' style={style1} ref='mail'></i>
        </div>

        <div className='inpbox'>
        <p>密码：</p>
        <input type="password" 
        className="inp" 
        placeholder='请输入您的密码（6-10位数）' 
        onBlur={(e)=>this.changeValue(e.target.value,4)}/>
        <i className='fa fa-times fa-1x' style={style1} ref='pass'></i>
        </div>

        <div className='inpbox'>
        <p>确认密码：</p>
        <input 
        type="password" 
        className="inp" 
        placeholder='请确认您输入的密码' 
        onBlur={(e)=>this.changeValue(e.target.value,5)}/>
        <i className='fa fa-times fa-1x' style={style1} ref='pass2'></i>
        </div>

        {this.state.idcode==1?
        <div className='inpbox'>
        <p>输入验证码：</p>
        <input 
        type="text" 
        className="inp" 
        placeholder='请输入您常用的邮箱' 
        onBlur={(e)=>this.changeValue(e.target.value,6)}/>
        <i className='fa fa-times fa-1x' style={style1} ref='idcode'></i>
        </div>:null}

        <button className='regbtn' onClick={this.onSubmit.bind(this,this.state.idcode)}>
        {this.state.idcode==0?'发送验证码':this.state.idcode==-1?'重新发送':'注册'}
        </button>
        <a href="/login" className='reg'>已注册？登录</a>
        </div>
      </div>
    );
  }
}

export default Register;