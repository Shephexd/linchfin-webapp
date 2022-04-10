import React, { useEffect, useState } from 'react';
import { getRealtimeData } from "connectors/firebase"
import { Layout, Row, Col, Table, Spin } from 'antd';
import { ResponsiveLine } from '@nivo/line';
import { ResponsivePie } from '@nivo/pie';
import { linearGradientDef } from '@nivo/core';

const { Content } = Layout;


interface portfolioWeightType {
    id: string;
    label: string;
    value: number;
}

function isEmpty(param: any) {
    return Object.keys(param).length === 0;
}

interface UniverseTableDataColumnType {
    title: string;
    dataIndex: string;
    key: string;
}

interface UniverseTableDataSourceType {
    key: string;
    symbol: string;
    category: string;
    subCategory: string;
    description: string;
};

interface UniverseTableDataType {
    dataSource: UniverseTableDataSourceType[];
    columns: UniverseTableDataColumnType[];
}


interface BacktestDataType {
    x: string;
    y: number;
}

const commonLineChartProperties = {
    margin: { top: 40, right: 20, bottom: 25, left: 40 },
    pointLabelYOffset: -12,
    animate: true,
    enableSlices: 'x',
    enableArea: true,
    areaOpacity: 0.55,
    enablePointLabel: false,
    pointSize: 1,
    pointBorderWidth: 1,
    useMesh: true,
    pointBorderColor: {
        from: 'color',
        modifiers: [['darker', 0.3]],
    }
}

const universeTableColumns: UniverseTableDataColumnType[] = [
    {
        title: 'Symbol',
        dataIndex: 'symbol',
        key: 'symbol',
    },
    {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
    },
    {
        title: 'SubCategory',
        dataIndex: 'subCategory',
        key: 'subCategory',
    }
];


function PortfolioPage() {

    const [backtestData, setBacktestData] = useState<{ result: BacktestDataType[] }>({ result: [] });
    const [portfolioWeights, setPortfolioWeights] = useState<portfolioWeightType[]>([]);
    const [tableData, setTableData] = useState<UniverseTableDataType>({ dataSource: [], columns: universeTableColumns });

    useEffect(() => {
        if (isEmpty(backtestData.result)) {
            getRealtimeData('backtest').then((bt) => {
                if (!isEmpty(bt.result)) {
                    setBacktestData(bt);
                }
                console.log(bt);
            });
        }

        if (isEmpty(portfolioWeights)) {
            var weights: portfolioWeightType[] = []
            getRealtimeData('portfolio').then((p) => {
                for (var k in p.weights) {
                    weights.push({
                        "id": k, "label": k, "value": p.weights[k]
                    })
                }
                setPortfolioWeights(weights);
            });
        }

        if (isEmpty(tableData.dataSource)) {
            var tableDataSource: UniverseTableDataSourceType[] = [];
            getRealtimeData('universe').then((univ) => {
                for (var symbol in univ) {
                    tableDataSource.push(
                        { key: symbol, symbol: symbol, ...univ[symbol] }
                    )
                    console.log(tableDataSource);
                }
                console.log(tableDataSource);
                if (!isEmpty(tableDataSource)) {
                    setTableData({ dataSource: tableDataSource, columns: universeTableColumns });
                }
            });
        }
    }, [portfolioWeights, tableData, backtestData])

    return (
        <div className="App">
            <Content style={{ padding: '10px', paddingBottom: '48px', paddingTop: '60px' }}>
                <Row justify="center" align="middle" gutter={[20, 20]}>
                    <Col span={24}>
                        <div className={"content-border-title"}>Model Portfolio</div>
                        <div className={"content-border"} style={{ height: "40vh" }}>
                            {
                                isEmpty(portfolioWeights) ? <Spin style={{ position: "absolute", top: "50%" }} /> :
                                    <ResponsivePie
                                        data={portfolioWeights}
                                        valueFormat=" >-.1%"
                                        margin={{ top: 40, right: 20, bottom: 20, left: 20 }}
                                        innerRadius={0.5}
                                        padAngle={0.7}
                                        cornerRadius={2}
                                        activeOuterRadiusOffset={8}
                                    />
                            }
                        </div>
                    </Col>
                </Row>
                <Row justify="center" align="middle" gutter={[20, 20]}>
                    <Col span={24}>
                        <div className={"content-border-title"}>Backtest Result</div>
                        <div className={"content-border"} style={{ height: "35vh" }}>
                            {
                                isEmpty(portfolioWeights) ? <Spin style={{ position: "absolute", top: "50%" }} /> :
                                    <ResponsiveLine
                                        {...commonLineChartProperties}
                                        data={[
                                            {
                                                id: 'return',
                                                data: backtestData.result,
                                            },
                                        ]}
                                        areaBlendMode={"darken"}
                                        curve={'monotoneX'}
                                        enableSlices={false}
                                        enableGridX={false}
                                        colors={['rgb(97, 205, 187)']}
                                        xScale={{
                                            type: 'time',
                                            format: '%Y-%m-%d',
                                            useUTC: false,
                                            precision: 'day'
                                        }}
                                        xFormat="time:%Y-%m-%d"
                                        yFormat=">-.2%"
                                        yScale={{
                                            type: 'linear',
                                            stacked: true,
                                            min: 'auto',
                                            max: 'auto'
                                        }}
                                        axisBottom={{
                                            format: '%Y %b',
                                            tickValues: 'every 6 months'
                                        }}
                                        defs={[
                                            linearGradientDef('graidentA', [
                                                { offset: 0, color: 'rgb(97, 205, 187)' },
                                                { offset: 50, color: 'rgb(97, 205, 187)', opacity: 0 },
                                            ])
                                        ]}
                                        fill={[{ match: '*', id: 'graidentA' }]}
                                        crosshairType="cross"
                                    />
                            }
                        </div>
                    </Col>
                </Row>
                <Row justify="center" align="middle" gutter={[20, 20]}>
                    <Col span={24}>
                        <div className={"content-border-title"}>Asset Universe</div>
                        <div className={"content-border"} style={{ height: "100%", width: "100%" }}>
                            <div style={{ minHeight: "20vh", marginTop: "24px" }}>
                                {
                                    isEmpty(tableData.dataSource) ? <Spin style={{ position: "absolute", top: "50%" }} /> :
                                        <Table dataSource={tableData.dataSource} columns={tableData.columns} />
                                }
                            </div>
                        </div>
                    </Col>
                </Row>
            </Content>
        </div>
    );
}

export default PortfolioPage;
