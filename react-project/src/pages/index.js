import React, { Component } from 'react';

export class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            msg: '一个msg数据'
        }
    }

    //组件将要挂载时
    componentWillMount() {
        console.log('组件将要挂载')
    }

    //组件挂载完成时
    componentDidMount() {
        console.log('组件挂载完成')
    }

    //更新数据函数
    setMsg = () => {
        this.setState({
            msg: '改变后的msg数据'
        })
        React.$api.apiTest({}).then(res => {

        })
    }

    //数据渲染
    render() {
        return (
            <div>
                {this.state.msg}
                <button onClick={this.setMsg}>更新数据</button>
            </div>
        )
    }

    //是否要更新数据 
    //nextProps: 父组件传给子组件的值, 没有显示空 
    //nextState: state 更新后的值
    shouldComponentUpdate(nextProps, nextState) {
        console.log('是否要更新数据')
        return true;
    }

    //将要更新数据时
    componentWillUpdate() {
        console.log('组件将要更新')
    }

    //数据更新完成时
    componentDidUpdate() {
        console.log('组件更新完成')
    }

    //改变props值时
    componentWillReceiveProps() {
        console.log('改变props值时')
    }

    //组件将要销毁时
    componentWillUnmount() {
        console.log('组件销毁')
    }
}

export default Index;

