<<<<<<< HEAD
// axios 接口: 判断环境, 输出对应的 接口头部
if (process.env.NODE_ENV === 'production') {
    module.exports = require('./api.prod')
} else {
    module.exports = require('./api.dev')
=======
/* global url: true */
import axios from 'axios'
// import * as baseURL from '../services'   // 管理配置的 URL( 包括测试接口 )
const qs = require('qs')

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

axios.defaults.baseURL = 'http://192.168.5.8:18082/'
export const baseURL = 'http://192.168.5.8:18082/'
// 查询
export const apiGet = (url) => {
    url = url + '?token=' + localStorage.getItem('token')
    return new Promise(function (resolve, reject) {
        axios.get(url).then(
            response => {
                let resulData = response.data
                if (resulData.data !== null && resulData.data !== '') {
                    if (resulData.data.toString() === '登录过期') {
                        localStorage.removeItem('token')
                        window.window.location.href = '/login'
                    } else {
                        resolve(resulData)
                    }
                } else {
                    resolve(resulData)
                }
            }
        ).catch(error => {
            reject(error)
        })
    })
}

// 获取资源
export const apiPost = (url, configObj) => {
    if (typeof (configObj) === 'undefined') {
        configObj = []
    }
    configObj['token'] = localStorage.getItem('token')
    return new Promise(function (resolve, reject) {
        axios.post(url, qs.stringify({...configObj})).then(
            response => {
                let resulData = response.data
                if (resulData.data !== null && resulData.data !== '') {
                    if (resulData.data.toString() === '登录过期') {
                        localStorage.removeItem('token')
                        window.location.href = '/login'
                    } else {
                        resolve(resulData)
                    }
                } else {
                    resolve(resulData)
                }
            }
        ).catch(error => {
            reject(error)
        })
    })
}
// 删除
export const apiDel = (configObj) => {
    return new Promise(function (resolve, reject) {
        axios.delete(url, qs.stringify({...configObj})).then(
            response => {
                let resulData = response.data
                resolve(resulData)
            }
        ).catch(error => {
            reject(error)
        })
    })
}

// 更新
export const apiPut = (configObj) => {
    return new Promise(function (resolve, reject) {
        axios.put(url, qs.stringify({
            ...configObj
        })).then(
            response => {
                let resulData = response.data
                resolve(resulData)
            }
        ).catch(error => {
            reject(error)
        })
    })
>>>>>>> cd084c6aa42d6ffc4aa871e42ae8952a3a7d3c7a
}
