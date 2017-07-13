// 环形图(测试案例, 应用于首页)

import React from 'react'
import ReactEcharts from 'echarts-for-react'

import styled       from 'styled-components'

const ParentBox = styled.div `
    position: relative;
`

const ParentEmphasis = styled.div `
    position: absolute;
    top: 52%;
    left: 45%;
    text-align: center;
`

const EmphasisTitle = styled.h2 `
    font-size: 1rem;
`

const EmphasisTitleP = styled.p `
    color: #989898;
`

const Ringdiagram = React.createClass({
    propTypes: {},
    getOtion: function () {
        const option = {
            title: {
                text: '某站点用户访问来源',
                subtext: '纯属虚构',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    center: ['50%', '60%'],
                    data: [
                        {
                            value: 335,
                            name: '直接访问'
                        }, {
                            value: 310,
                            name: '邮件营销'
                        }, {
                            value: 234,
                            name: '联盟广告'
                        }, {
                            value: 135,
                            name: '视频广告'
                        }, {
                            value: 1548,
                            name: '搜索引擎'
                        }
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
        return option
    },
    onChartClick: function (param, echart) {
        console.log(param, echart)
        alert('chart click')
    },
    onChartLegendselectchanged: function (param, echart) {
        console.log(param, echart)
        alert('chart legendselectchanged')
    },
    onChartReady: function (echart) {
        console.log('echart is ready', echart)
    },
    render: function () {
        let onEvents = {
            'click': this.onChartClick,
            'legendselectchanged': this.onChartLegendselectchanged
        }

        return (
            <div className="examples" style={{
                width: '50%',
                float: 'left'}}
            >
                <ParentBox className="parent">
                    <ReactEcharts
                        option={this.getOtion()}
                        style={{ height: 300 }}
                        onChartReady={this.onChartReady}
                        onEvents={onEvents}
                    />

                    <ParentEmphasis>
                        <EmphasisTitle> 200 </EmphasisTitle>
                        <EmphasisTitleP> 报修总数 </EmphasisTitleP>
                    </ParentEmphasis>
                </ParentBox>
            </div>
        )
    }
})

export default Ringdiagram
