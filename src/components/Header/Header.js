import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'
import logo from './海鲜.png'
import home from './home-big.png'
import lab from './实验室编号.png'
import item from './item.png'
import goods from './物品管理.png'
import teacher from './teacher.png'
import { Menu, Dropdown, Icon } from 'antd';
import search from './search.png'
import information from './资讯.png'
import { browserHistory } from 'react-router'
// import {Row, Col} from 'antd'

const menuitem = (
  <Menu>
    <Menu.Item style={{ background: '#333', fontSize: 14 }}>
      <Link to='/ItemPage' style={{ color: '#fff', fontWeight: 500, textAlign: 'center' }}>项目列表</Link>
    </Menu.Item>
    <Menu.Item style={{ background: '#333', fontSize: 14 }}>
      <Link to='/ProjectResult' style={{ color: '#fff', fontWeight: 500, textAlign: 'center' }}>成果列表</Link>
    </Menu.Item>
     <Menu.Item style={{ background: '#333', fontSize: 14 }}>
      <Link to='/NewItem' style={{ color: '#fff', fontWeight: 500, textAlign: 'center' }}>新项目申报</Link>
    </Menu.Item>

  </Menu>
);

const menuitem2 = (
  <Menu>
    <Menu.Item style={{ background: '#333', fontSize: 14 }}>
      <Link to='/Lab' style={{ color: '#fff', fontWeight: 500, textAlign: 'center' }}>实验室列表</Link>
    </Menu.Item>
    <Menu.Item style={{ background: '#333', fontSize: 14 }}>
      <Link to='/teacher' style={{ color: '#fff', fontWeight: 500, textAlign: 'center' }}>实验室老师</Link>
    </Menu.Item>
     <Menu.Item style={{ background: '#333', fontSize: 14 }}>
      <Link to='/goods' style={{ color: '#fff', fontWeight: 500, textAlign: 'center' }}>实验室物品</Link>
    </Menu.Item>

  </Menu>
);

const menuitem3 = (
  <Menu>
    <Menu.Item style={{ background: '#333', fontSize: 14 }}>
      <Link to='/news' style={{ color: '#fff', fontWeight: 500, textAlign: 'center' }}>学科资讯</Link>
    </Menu.Item>
  </Menu>
);

class Header extends React.Component {
  toSearch() {
    // e.preventDefault()
    browserHistory.push({
      pathname: `/search`
    })
  }
  render() {
    return (
      <div className='head'>
        <div className="navbar">
          <div className="nav_con">
            <span className="nav_logo">
              <a href="">
                <img src={logo} alt="" />
              </a>
            </span>
            <IndexLink to='/' activeClassName='active'>
              <span className="nav_item">
                <img src={home} alt="" />
                主页
            </span>
            </IndexLink>
          {/*<Link activeClassName='active' to='/Lab'>*/}
          <Dropdown overlay={menuitem2} placement='bottomCenter'>
              <span className="nav_item">
                <img src={lab} alt="" />
                实验室
            </span>
            </Dropdown>
            <Dropdown overlay={menuitem} placement="bottomCenter">
              {/*<Link activeClassName='active' to='/ItemPage'>*/}
              <span className="nav_item">
                <img src={item} alt="" />
                项目
            </span>
              {/*</Link>*/}
            </Dropdown>
            <Dropdown overlay={menuitem3} placement="bottomCenter">
              {/*<Link activeClassName='active' to='/ItemPage'>*/}
              <span className="nav_item">
                <img src={information} alt="" />
                资讯
            </span>
              {/*</Link>*/}
            </Dropdown>
            {/*
            <Link activeClassName='active' to='/Goods'>
              <span className="nav_item">
                <img src={goods} alt="" />
                物品
            </span>
            </Link>
            <Link activeClassName='active' to='/Teacher'>
              <span className="nav_item">
                <img src={teacher} alt="" />
                教师
            </span>
            </Link>
            */}
          </div>

          {/*search*/}
         {/*  <div className="search">
            <input type="text" placeholder='search...' />
            <div className="sea_icon" onClick={this.toSearch.bind(this)}>
              <img src={search} alt="" />
            </div>
          </div> */}
        </div>
      </div>
    );
  }
}

export default Header;


