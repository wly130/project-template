import React, {Component} from "react";

export class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: "一个msg数据",
        };
    }

    //更新数据函数
    setMsg = () => {
        this.setState({
            msg: "改变后的msg数据",
        });
        React.$api.apiTest({});
    };

    //数据渲染
    render() {
        return (
            <div>
                {this.state.msg}
                <button onClick={this.setMsg}>更新数据</button>
            </div>
        );
    }
}

export default Index;
