import React, { Component } from 'react';
import FreeScrollBar from 'react-free-scrollbar';
import '../css/LabItem.scss'
import { POST } from '../../../components/commonModules/POST';
import { message } from 'antd'

class LabItem extends Component {
   constructor(props) {
    super(props);
    this.state={
      list:[{
        name:'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        time:'12-1',
        belong:'D0506',
        teacher:'lorem'
      },{
        name:'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        time:'12-1',
        belong:'D0506',
        teacher:'lorem'
      },{
        name:'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        time:'12-1',
        belong:'D0506',
        teacher:'lorem'
      },{
        name:'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        time:'12-1',
        belong:'D0506',
        teacher:'lorem'
      },{
        name:'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        time:'12-1',
        belong:'D0506',
        teacher:'lorem'
      },{
        name:'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        time:'12-1',
        belong:'D0506',
        teacher:'lorem'
      },{
        name:'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        time:'12-1',
        belong:'D0506',
        teacher:'lorem'
      },{
        name:'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        time:'12-1',
        belong:'D0506',
        teacher:'lorem'
      },{
        name:'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        time:'12-1',
        belong:'D0506',
        teacher:'lorem'
      }]
    }
  }

  componentWillReceiveProps(nextProps) {
    POST('/getLabPro', `id=${nexrProps.id}`, re => {
      if (re.state == 1) {
        this.setState({ list: re.data });
      } else {
        message.error('服务器错误')
      }
    })
  }  

  render() {
    return (
      <div className='labitem'>
        <div className="item_head">
          <h2>项目展示</h2>
        </div>
        <div className="item_list">
        <FreeScrollBar className='scroll' style={{height:250}} >
          {this.state.list.map((item,i)=>{
            return(
              <div key={i} style={{textDecoration:'none'}}>
              <div className="list_box">
                <p>{item.name}</p>
              </div>
              <div className="list_time">
              <span>{item.time}&nbsp;&nbsp;&nbsp;&nbsp;{item.teacher}&nbsp;&nbsp;&nbsp;&nbsp;{item.belong}</span>
              </div>
              </div>
            )
          })}
        </FreeScrollBar>
        </div>
        <div className="item_foot">
          <div className="more">
            
          </div>
        </div>
      </div>
    );
  }
}

export default LabItem;