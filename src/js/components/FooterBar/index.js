import React from 'react';
import { Layout } from 'antd';
const { Footer } = Layout;
//底部
class FooterBar extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <Footer style={{ textAlign: 'center',background: '#fff' }}>我是底部</Footer>
        );
    }
}

export default FooterBar;
