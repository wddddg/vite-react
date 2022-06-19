import React, { useEffect, useState } from 'react'
import { Layout } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
const { Content } = Layout;
import "./index.css";
import './App.less'
import { Outlet } from 'react-router-dom'
import Breadcrumb from './components/Breadcrumb'
import { useDispatch } from 'react-redux';

import SiderComponents from './components/Sider'
import HeaderComponents from './components/Header';
import { queryAllLength } from './request/api'


import * as echarts from 'echarts';



function App() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const localtion = useLocation()

  const [textNumber, setTextNumber] = useState(0)
  const [userNumber, setUserNumber] = useState(0)
  const [isadminNumber, setIsadminNumber] = useState(0)
  const [delTextNumber, setDelTextNumber] = useState(0)

  useEffect(() => {
    if (!localStorage.length) {
      navigate('/login')
      dispatch({
        type: '/login',
        payload: {
          error: '你还没登录，请先登录再访问！'
        }
      })
    }
  }, [localStorage])

  useEffect(() => {
    queryAllLength().then(res => {
      setTextNumber(res.textNumber)
      setUserNumber(res.userNumber)
      setIsadminNumber(res.isadminNumber)
      setDelTextNumber(res.delTextNumber)
    })
  }, [localStorage])

  useEffect(() => {
    // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(document.getElementById('echartMianText'));
    // 绘制图表
    myChart.setOption({
      tooltip: {
        trigger: 'item'
      },
      legend: {
        left: 'left'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '40%',
          data: [
            { value: textNumber, name: '文章数量' },
            { value: delTextNumber, name: '文章删除数量' },
          ],
          center: ['40%', '70%'],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    });
  }, [textNumber, delTextNumber])

  useEffect(() => {
    // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(document.getElementById('echartMianUserAndText'));
    // 绘制图表
    myChart.setOption({
      tooltip: {
        trigger: 'item'
      },
      color: ['#9a60b4', '#ea7ccc'],
      legend: {
        left: 'left'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '40%',
          data: [
            { value: userNumber, name: '用户人数' },
            { value: textNumber, name: '文章数量' },
          ],
          center: ['40%', '70%'],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    });
  }, [textNumber, userNumber])

  useEffect(() => {
    // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(document.getElementById('echartMianUser'));
    // 绘制图表
    myChart.setOption({
      tooltip: {
        trigger: 'item'
      },
      color: ['#3ba272', '#fc8452'],
      legend: {
        left: 'left'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '40%',
          data: [
            { value: userNumber, name: '用户人数' },
            { value: isadminNumber, name: '管理员数量' },
          ],
          center: ['40%', '70%'],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    });
  }, [isadminNumber, userNumber])

  useEffect(() => {
    // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(document.getElementById('echartMianbar'));
    // 绘制图表
    myChart.setOption({
      xAxis: {
        type: 'category',
        data: ['文章数量', '用户数量', '管理员数量', '删除文章数量']
      },
      yAxis: {
        type: 'value'
      },
      grid: {
        x: 30,
        y: 20,
        x2: 200,
        y2: 20
      },
      series: [
        {
          data: [textNumber, userNumber, isadminNumber, delTextNumber],
          barWidth: '40%',
          label: { show: true, position: 'top', },
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        }
      ]
    });
  }, [textNumber, userNumber, isadminNumber, delTextNumber])

  return (
    <div className='box'>
      <Layout className='layouts'>
        <SiderComponents></SiderComponents>
        <Layout>
          <HeaderComponents></HeaderComponents>
          <div className='breadcrumbCss'>
            <Breadcrumb pathnames={localtion}></Breadcrumb>
          </div>
          <Content>
            <div className='content-test'>
              <div style={{ backgroundColor: '#fff', width: '100%', height: '100%', overflow: 'hidden' }}>
                <div style={{ display: localtion.pathname === '/' ? 'block' : 'none', width: '100%', height: '100%' }}>
                  <div className='flexEchart'>
                    <div id={'echartMianUserAndText'} style={{ width: '50%', height: '50%' }} ></div>
                    <div id={'echartMianText'} style={{ width: '50%', height: '50%' }} ></div>
                    <div id={'echartMianUser'} style={{ width: '50%', height: '50%' }} ></div>
                    <div id={'echartMianbar'} style={{ width: '50%', height: '50%' }} ></div>
                  </div>
                </div>
                <Outlet style={{ display: localtion.pathname !== '/' ? 'block' : 'none' }} ></Outlet>
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
    </div >
  )
}

export default App
