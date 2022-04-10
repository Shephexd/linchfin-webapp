import React, { useEffect, useState } from 'react';
import { getRealtimeData } from "connectors/firebase"
import { Layout, Row, Col, InputNumber, Spin } from 'antd';

const { Content } = Layout;


interface portfolioWeightType {
    id: string;
    label: string;
    value: number;
}

function isEmpty(param: any) {
    return Object.keys(param).length === 0;
}


function RebalancingPage() {

    const [portfolioWeights, setPortfolioWeights] = useState<portfolioWeightType[]>([]);
    const [baseAmount, setBaseAmount] = useState(1000000);

    useEffect(() => {
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
    }, [portfolioWeights])

    return (
        <div className="App">
            <Content style={{ padding: '10px', paddingBottom: '48px', paddingTop: '60px' }}>
                <Row justify="center" align="middle" gutter={[20, 20]}>
                    <Col span={24}>
                        <div>
                            {
                                isEmpty(portfolioWeights) ? <Spin style={{ position: "absolute", top: "50%" }} /> :
                                    <InputNumber addonBefore="+" addonAfter="$" defaultValue={baseAmount} onChange={setBaseAmount} />
                            }
                            {
                                <div>
                                    {
                                        portfolioWeights.map((weight) => {
                                            return (<div key={weight.id}>
                                                <span>{weight.label}: {baseAmount * weight.value}</span>
                                            </div>);
                                        })
                                    }
                                </div>
                            }
                        </div>
                    </Col>
                </Row>
                <Row justify="center" align="middle" gutter={[20, 20]}>
                    <Col span={24}>

                    </Col>
                </Row>
                <Row justify="center" align="middle" gutter={[20, 20]}>
                    <Col span={24}>
                    </Col>
                </Row>
            </Content>
        </div>
    );
}

export default RebalancingPage;
