import React, { Component } from 'react'
import { Icon, Row, Col, Button, Pagination, Popconfirm, message, Modal, Input, DatePicker, Upload } from 'antd'
import '../css/Item.scss'
import { browserHistory } from 'react-router'
import ReactDOM from 'react-dom'
import { POST, POSTFile, BASE_URL } from '../../../components/commonModules/POST'

class Item extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [{
        title: 'Lorem ipsum dolor sit amet',
        id: '1',
        time: '18-1-1',
        origin: '麦兜',
        chargeTeacher: '可达鸭',
        expertTime: '18-12-12',
        user:{
          name:''
        }
      }, {
        title: 'Lorem ipsum dolor sit amet',
        id: '1',
        time: '18-1-1',
        origin: '麦兜',
          chargeTeacher: '可达鸭',
          expertTime: '18-12-12',
          user: {
            name: ''
          }
      }, {
        title: 'Lorem ipsum dolor sit amet',
        id: '1',
        time: '18-1-1',
        origin: '麦兜',
          chargeTeacher: '可达鸭',
          expertTime: '18-12-12',
          user: {
            name: ''
          }
      }],
      current: 1,
      visible: false,
      title: '',
      origin: '',
      originXh: '',
      teacher: '',
      endTime: '',
      evisible: false,
      sid:'',
      total:'',
      file:'',
      id:''
    }
  }
  // 添加新项目
  showModal = () => {
    this.setState({
      visible: true
    })
  }
  // 确认添加新项目
  handleOk = (e) => {
    let labid=this.props.labid
    console.log(labid)
    let pname=this.state.title
    let teacherId=this.state.sid
    let userId=this.state.originXh
    let expectTime=this.state.endTime
    let data = `labId=${labid}&pname=${pname}&teacherId=${teacherId}&userId=${userId}&expectTime=${expectTime}`
    POST('/labt/addNewPro',data,re=>{
      if(re.state==1){
        message.success('添加成功')
        let data = `pageCount=${4}&currentPage=${this.state.current}&labId=${this.props.labid}`
        POST('/labt/getLabPro', data, re => {
          if (re.state == 1) {
            this.setState({ list: re.data.rows,
            total:re.data.count })
          } else {
            message.error('服务器错误')
          }
        })
      }else if(re.state==-2){
        message.error('输入的用户不存在，请重新输入')
      }else{
        message.error('服务器错误')
      }
    })
    this.setState({
      visible: false
    })
  }
  // 取消添加
  handleCancel = (e) => {
    console.log(e)
    this.setState({
      visible: false
    })
  }
  // 翻页
  changePage = (page) => {    
    this.setState({
      current: page
    })
    let data = `pageCount=${4}&currentPage=${page}&labId=${this.props.labid}`
    POST('/labt/getLabPro', data, re => {
      if (re.state == 1) {
        this.setState({ list: re.data.rows })
      } else {
        message.error('服务器错误')
      }
    })
  }

  componentWillMount() {
    let newDate = new Date()
    this.setState({ date: newDate.toLocaleDateString() })
    this.initial()
  }
//初始化页面
  initial(){   
    let data = `pageCount=${4}&currentPage=${this.state.current}&labId=${this.props.labid}`
    POST('/labt/getLabPro', data, re => {
      if (re.state == 1) {
        this.setState({ list: re.data.rows,
          total: re.data.count })
      } else {
        message.error('服务器错误')
      }
    })
  }

  // 确认结束项目
  confirmEnd = (e) => {
    console.log(e)
    message.success('Click on Yes')
  }
  // 确认删除项目
  confirmDelete = (i) => {
    let data = `id=${i}`
    POST('/labt/deletePro', data, re => {
      if (re.state == 1) {
        let data = `pageCount=${4}&currentPage=${this.state.current}&labId=${this.props.labid}`
        POST('/labt/getLabPro', data, re => {
          if (re.state == 1) {
            this.setState({ list: re.data.rows,
              total: re.data.count })
          } else {
            message.error('服务器错误')
          }
        })
      } else {

      }
    })
  }
  // 取消
  cancel = (e) => {
    console.log(e)
    message.error('Click on No')
  }
  // 新项目输入
  changeValue = (type, value) => {
    switch (type) {
      case 1: this.setState({ title: value }); break
      case 2: this.setState({ origin: value }); break
      case 3: this.setState({ originXh: value }); break
      case 4: this.setState({ teacher: value }); break
      case 5: this.setState({ sid: value }); break

    }
  }
  // 新项目预期结束时间
  changeTime = (date, dateString) => {    
    this.setState({ endTime: dateString })
  }

  // 编辑页面
  toEdit(num) {    
    browserHistory.push({
      pathname: `/iteminfo`,
      query: {
        id: num
      }
    })
  }
//打开结束项目对话框
  showEnd = (id) => this.setState({ evisible: !this.state.evisible,id:id })
//结束项目
  ehandleOk = (id) => {    
    var formdata = new FormData()
    formdata.append('file', this.state.file[0].originFileObj)
    formdata.append('projectResults', 'end Project')
    formdata.append('id', this.state.id)
    POSTFile('/endProject', formdata, re => {
      if (re.state == 1) {
        message.success('恭喜完成一个完整的项目(๑•̀ㅂ•́)و✧')
        this.initial()
      } else {
        message.error('服务器错误')
      }
    })
    this.setState({
      evisible: false
    })
  }

  ehandleCancel = (e) => {    
    this.setState({
      evisible: false
    })
  }
  //上传成果文件
  onChange(info) {
    this.setState({ file: info.fileList })    
  }
  //下载成果文件
  downDoc(text){
    window.open(BASE_URL + text)
    
  }
  render() {
    const props = {
      name: 'file',
      action: '',
      headers: {
        authorization: 'authorization-text'
      }
    }  
    const {file} = this.state
    var teacher = []
    return (
      <div style={{ paddingTop: 20, paddingRight: 15 }}>
        <div className='itemcharge'>
          <div className='item_hea'>
            <h2>实验室项目管理</h2>
          </div>

          <div className='item_con'>
            <Row>
              {this.state.list.map((item, i) => {
                //获取指导老师信息
                POST('/getTeacherById', `id=${item.chargeTeacher}`,re=>{
                  if(re.state==1){
                    console.log(re.data.name)
                    if(re.data!=null){
                      this.refs[i].innerHTML=re.data.name
                    }                    
                  }else{

                  }
                })
                return (
                  <Col span={12} key={i} style={{ padding: 5 }}>
                    <div className='item_box'>
                      <div className='item_title'>
                        <h3>{item.name}</h3>
                      </div>
                      <div className='item_box_con'>
                        <div className='con_item'>
                          <Row>
                            <Col span={6}>发起人：</Col>
                            <Col span={18}>{item.user.name}</Col>
                          </Row>
                        </div>
                        <div className='con_item'>
                          <Row>
                            <Col span={6}>指导老师：</Col>
                            <Col span={18}><div ref={i}></div></Col>
                          </Row>
                        </div>
                        <div className='con_item'>
                          <Row>
                            <Col span={6}>预计结束时间:</Col>
                            <Col span={18}>{item.expertTime}</Col>
                          </Row>
                        </div>
                        {item.actualTime==null?'':
                          <div className='con_item'>
                            <Row>
                              <Col span={6}>结束时间:</Col>
                              <Col span={18}>{item.actualTime}</Col>
                            </Row>
                          </div>
                        }
                        <Row>
                          <Col span={12} />
                          <Col span={4}>
                            <Button onClick={this.toEdit.bind(this, item.id)} style={{ width: '100%' }}>查看项目进度</Button>
                          </Col>
                          <Col span={4}>
                            {item.actualTime == null ? 
                              <Button
                                style={{ width: '100%' }}
                                onClick={this.showEnd.bind(this, item.id)}
                              >结束项目</Button>
                               : 
                              <Button
                                style={{ width: '100%' }}
                                onClick={this.downDoc.bind(this, item.resultsText)}
                              >查看成果报告</Button>}
                            
                            <Modal
                              title='提交结项文档'
                              visible={this.state.evisible}
                              onOk={this.ehandleOk.bind(this)}
                              onCancel={this.ehandleCancel.bind(this)}>
                              <Upload {...props} accept='application/msword' onChange={this.onChange.bind(this)} fileList={file}>
                                {file.length >= 1 ? null :
                                  <Button style={{ marginBottom: 20 }} >
                                    <Icon type="upload" /> 点击上传文件（word）
                                  </Button>}
                              </Upload>                              
                            </Modal>
                          </Col>
                          <Col span={4}>
                            <Popconfirm title='确定删除此项目吗?删除后将无法找回' onConfirm={this.confirmDelete.bind(this, item.id)} onCancel={this.cancel.bind(this)} okText='Yes' cancelText='No'>
                              <Button type='danger' style={{ width: '100%' }} >删除</Button>
                            </Popconfirm>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Col>
                )
              })}
            </Row>
          </div>

          <div className='item_foot'>

            {/* 新增项目*/}

            <Row>
              <Col span={4}>
                <Button type='primary' onClick={this.showModal.bind(this)}>启动新项目</Button>
                <Modal
                  title='启动新项目'
                  visible={this.state.visible}
                  onOk={this.handleOk.bind(this)}
                  onCancel={this.handleCancel.bind(this)}
                >
                  <Row style={{ marginBottom: 10 }}>
                    <Col span={5} style={{ verticalAlign: 'middle', fontSize: 14 }}>项目名称：</Col>
                    <Col span={18}><Input placeholder='请输入项目的名称' onChange={(e) => this.changeValue(1, e.target.value)} /></Col>
                  </Row>
                  <Row style={{ marginBottom: 10 }}>
                    <Col span={5} style={{ verticalAlign: 'middle', fontSize: 14 }}>发起人:</Col>
                    <Col span={18}><Input placeholder='请输入项目的发起人' onChange={(e) => this.changeValue(2, e.target.value)} /></Col>
                  </Row>
                  <Row style={{ marginBottom: 10 }}>
                    <Col span={5} style={{ verticalAlign: 'middle', fontSize: 14 }}>发起人学号:</Col>
                    <Col span={18}><Input placeholder='请输入项目的发起人学号' onChange={(e) => this.changeValue(3, e.target.value)} /></Col>
                  </Row>
                  <Row style={{ marginBottom: 10 }}>
                    <Col span={5} style={{ verticalAlign: 'middle', fontSize: 14 }}>项目指导老师：</Col>
                    <Col span={18}><Input placeholder='请输入项目的指导老师' onChange={(e) => this.changeValue(4, e.target.value)} /></Col>
                  </Row>
                  <Row style={{ marginBottom: 10 }}>
                    <Col span={5} style={{ verticalAlign: 'middle', fontSize: 14 }}>教工号：</Col>
                    <Col span={18}><Input placeholder='请输入项目的指导老师的教工号' onChange={(e) => this.changeValue(5, e.target.value)} /></Col>
                  </Row>
                  <Row style={{ marginBottom: 10 }}>
                    <Col span={7} style={{ verticalAlign: 'middle', fontSize: 14 }}>项目预计结束时间：</Col>
                    <Col span={16}><DatePicker onChange={this.changeTime.bind(this)} /></Col>
                  </Row>
                </Modal>
              </Col>
              <Col span={14} />
              <Col span={6}><Pagination               
              current={this.state.current} 
              onChange={this.changePage.bind(this)} 
              total={this.state.total}
              hideOnSinglePage={true}
              pageSize={4} /></Col>
            </Row>
          </div>
        </div>
      </div>
    )
  }
}

export default Item
