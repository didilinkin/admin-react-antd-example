// 客户管理 - 客户报修
import React, {Component} from 'react'
import {Table, Button, Spin, DatePicker, Input, message} from 'antd'
import '../../style/test.less'
import {apiPost} from '../../../../api/api.dev'
// 引入组件
const { RangePicker } = DatePicker

// React component
class NewWindRoom extends Component {
    constructor (props) {
        super(props)
        this.state = {
            loading: false,
            visible: false,
            columns: [],
            dataSource: []
        }
    }
    async initialRemarks () {
        let result = await apiPost(
            'deviceMaintain/getNewWindRoom'
        )
        const abnormal = this.abnormal
        this.setState({
            loading: false,
            columns: [{
                title: '序号',
                width: 80,
                dataIndex: 'id',
                key: 'id',
                render: function (text, record, index) {
                    index++
                    return (
                        <span>{index}</span>
                    )
                }
            }, {
                title: '巡检日期 ',
                width: 150,
                dataIndex: 'inspectionDate',
                key: 'inspectionDate'
            }, {
                title: '设备编号',
                width: 150,
                dataIndex: 'machineRoomNumber',
                key: 'machineRoomNumber'
            }, {
                title: '设备名称',
                width: 150,
                dataIndex: 'machineRoomName',
                key: 'machineRoomName'
            }, {
                title: '巡检人',
                width: 150,
                dataIndex: 'patrolName',
                key: 'patrolName'
            }, {
                title: '楼层',
                width: 150,
                dataIndex: 'floor',
                key: 'floor'
            }, {
                title: '控制柜',
                width: 150,
                dataIndex: 'wireRopeState',
                key: 'wireRopeState'
            }, {
                title: '阀门',
                width: 150,
                dataIndex: 'cabinetCleanState',
                key: 'cabinetCleanState'
            }, {
                title: '压力',
                width: 150,
                dataIndex: 'cabinetDeviceState',
                key: 'cabinetDeviceState'
            }, {
                title: '管道',
                width: 150,
                dataIndex: 'cabinetVentilatorState',
                key: 'cabinetVentilatorState'
            }, {
                title: '滴漏情况',
                width: 150,
                dataIndex: 'elevatorVoiceState',
                key: 'elevatorVoiceState'
            }, {
                title: '清扫情况',
                children: [{
                    title: '清扫',
                    dataIndex: 'wellLightingState',
                    key: 'wellLightingState'
                }, {
                    title: '拖拭',
                    dataIndex: 'airVentilateState',
                    key: 'airVentilateState'
                }]
            }, {
                title: '照明情况',
                width: 150,
                dataIndex: 'hygieneCleanState',
                key: 'hygieneCleanState'
            }, {
                title: '异常情况',
                width: 200,
                dataIndex: 'opt',
                key: 'opt',
                fixed: 'right',
                render: function (text, record, index) {
                    return (
                        <a onClick={() => abnormal(record.id, 5)}>查看</a>
                    )
                }
            }],
            dataSource: result.data
        })
    }
    componentDidMount () {
        this.initialRemarks()
    }
    abnormal = async (id, type) => {
        let resulData = await apiPost('/deviceMaintain/electricalErrorDevice',
            {parentId: id,
                parentType: type})
        if (resulData.data !== null) {
            window.location.href = '/deviceMaintain/electricalErrorDevice/' + id + ',7'
        } else {
            message.info('无异常信息')
        }
    }
    refresh = async () => {
        // 刷新表格
        let result = await apiPost(
            'deviceMaintain/getNewWindRoom',
            {'floor': this.floor,
                'patrolName': this.patrolName,
                'startTime': this.startTime,
                'endTime': this.endTime
            }
        )
        this.setState({
            openinvalid: false,
            opendispatch: false,
            openElevatorRoom: false,
            openUpdate: false,
            dataSource: result.data,
            id: 0
        })
    }
    query = () => {
        this.refresh()
    }
    floor = ''
    entryFloorOnChange = (e) => {
        this.floor = e.target.value
    }
    patrolName = ''
    entryNameOnChange = (e) => {
        this.patrolName = e.target.value
    }
    startTime = ''
    endTime = ''
    getDate = (date, dateString) => {
        this.startTime = dateString[0]
        this.endTime = dateString[1]
    }
    render () {
        return (
            <div>
                <span style={{paddingBottom: '10px',
                    display: 'block'}}
                >
                    <span>巡检日期&nbsp;：&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <RangePicker onChange={this.getDate} />
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;巡检人&nbsp;：&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <Input style={{width: 200,
                        marginRight: '5px'}} onChange={this.entryNameOnChange}
                    />
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;楼层&nbsp;：&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <Input style={{width: 200,
                        marginRight: '5px'}} onChange={this.entryFloorOnChange}
                    />
                    <Button type="primary" onClick={this.query}>查询</Button>
                </span>
                <Spin spinning={this.state.loading}>
                    <Table
                        scroll={{ x: 2280 }}
                        bordered={3}
                        dataSource={this.state.dataSource}
                        columns={this.state.columns}
                    />
                </Spin>
            </div>
        )
    }
}
export default NewWindRoom

