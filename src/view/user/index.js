import React from 'react';
import { Pagination, Icon } from 'antd';
class User extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div>
                <Pagination defaultCurrent={1} total={50} />
                <Icon type="setting" theme="filled" />
            </div>
        );
    }
}
export default User;