import React, { Component } from "react";
import {  Linking, StyleSheet, Dimensions, Image, View, StatusBar, TouchableOpacity , Text} from "react-native";

import Echarts from "native-echarts";

class EchartsShow extends Component {
    constructor(props) {
        super(props);
    
    }

    shouldComponentUpdate(nextProps, nextState) {
        // if (this.props.number === nextProps.number) {
        //     return false;
        // } else {
        //     return true;
        // }
        return false;
    }

    render() {
        option = {
            title: {
                text: 'Battery-Inverter(PeakPower)',
                subtext: '',
                x: 'right',
                align: 'right'
            },
            grid: {
                bottom: 80
            },
            // toolbox: {
            //   feature: {
            //     dataZoom: {
            //       yAxisIndex: 'none'
            //     },
            //     restore: {},
            //     saveAsImage: {}
            //   }
            // },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    animation: false,
                    label: {
                        backgroundColor: '#505765'
                    }
                }
            },
            legend: {
                data: ['Battery', 'Inverter'],
                x: 'left'
            },
            dataZoom: [
                {
                    show: true,
                    realtime: false,
                    start: 0,
                    end: 100
                },
                {
                    type: 'inside',
                    realtime: true,
                    start: 65,
                    end: 85
                }
            ],
            xAxis: [
                {
                    type: 'category',
                    // silent: true,
                    boundaryGap: false,
                    axisLine: { onZero: true },
                    data: this.props.xAxisData
                }
            ],
            yAxis: [
                {
                    name: 'Battery(kWh)',
                    type: 'value',
                    max: 70
                },
                {
                    name: 'Inverter',
                    nameLocation: 'end',
                    max: 50,
                    min: -50,
                    type: 'value',
                    inverse: false
                }
            ],
            series: [
                {
                    name: 'Battery',
                    type: 'line',
                    animation: true,
                    areaStyle: {
                    },
                    lineStyle: {
                        smooth: true,
                        width: 1
                    },
                    data: this.props.BatteryData
                },
                {
                    name: 'Inverter',
                    type: 'line',
                    yAxisIndex: 1,
                    animation: true,
                    areaStyle: {
                    },
                    lineStyle: {
                        smooth: true,
                        width: 1
                    },
                    data: this.props.InverterData
                }
            ]
        }
        return (
            <View>
                {/* {this.state.progress==0 && <Echarts option={option} height={350} />} */}
                <Echarts option={option} height={350} />

            </View>
        );
    }
}

export default EchartsShow;