'use strict'

var React = require('react');
var ReactDOM = require('react-dom');

var my_news = [
    {
        author: 'user1',
        text: 'I am the shadow, I am the light',
        fullText: 'Shinedown - Boom Lay Boom Lay Boom'
    },
    {
        author: 'user2',
        text: 'But I am definetely not alone, Well I\'m definitely not alone',
        fullText: 'Volbeat - Counting'
    },
    {
        author: 'user3',
        text: 'I need help in many ways',
        fullText: 'Sum41 - Screaming Bloody Murder'
    }
]

var Article = React.createClass({
    propTypes:{
      data: React.PropTypes.shape({
          author: React.PropTypes.string.isRequired,
          text: React.PropTypes.string.isRequired,
          fullText: React.PropTypes.string.isRequired
      })
    },

    getInitialState: function () {
        return{
            visible:false
        };
    },

    readmoreClick: function (e) {
        e.preventDefault();
        this.setState({visible:true});
    },

    render: function () {
        var author = this.props.data.author,
            text = this.props.data.text,
            fullText = this.props.data.fullText,
            visible = this.state.visible;

        return(
            <div className="article">
                <p className="news__author">{author}:</p>
                <p className="news__text">{text}</p>
                <a href="#"
                   className={'news__readmore ' + (visible ? 'none' : '')}
                   onClick={this.readmoreClick}>
                    Подробнее
                </a>
                <p className={'news__full-text ' + (visible ? '' : 'none')}>{fullText}</p>
            </div>
        )
    }
});

window.ee = new EventEmitter();

var Add = React.createClass({
    getInitialState: function () {
        return {
            btnIsDisabled:true,
            ruleIsChecked: false,
            authorIsEmpty: true,
            textIsEmpty: true
        }
    },

    componentDidMount:function () {
        ReactDOM.findDOMNode(this.refs.author).focus();

    },

    componentWillMount:function () {

    },

    newsButtonClick: function (e) {
        e.preventDefault();
        var textEmpty = ReactDOM.findDOMNode(this.refs.text);

        var author = ReactDOM.findDOMNode(this.refs.author).value,
            text = ReactDOM.findDOMNode(this.refs.text).value;

        var item = [{
            author: author,
            text: text,
            fullText: '...'
        }];

        window.ee.emit('News.add', item);

        textEmpty.value = '';
        this.setState({textIsEmpty:true});
    },

    ruleChecked: function (e) {
        this.setState({ruleIsChecked: !this.state.ruleIsChecked})
    },

    onFieldChange:function (fieldName, e) {
        e.target.value.trim().length > 0 ?
            this.setState({[''+fieldName]:false})
            :
            this.setState({[''+fieldName]:true})
    },

    render: function () {
        return(
            <form className="add cf">
                <input
                    className="add__author form-control"
                    defaultValue=""
                    onChange={this.onFieldChange.bind(this, 'authorIsEmpty')}
                    placeholder="Enter your name"
                    ref="author"
                    type="text"/>
                <textarea
                    className="add__text form-control"
                    ref="text"
                    onChange={this.onFieldChange.bind(this, 'textIsEmpty')}
                    cols="30" rows="10"></textarea>
                <br/>
                <label className="add__checkrule">
                    <input type="checkbox" onChange={this.ruleChecked} ref="checkrule" defaultChecked={false}/> Agreed
                </label>
                <br/>
                <button
                    type="button"
                    onClick={this.newsButtonClick}
                    ref="alert_button"
                    className="btn btn-primary"
                    disabled={!this.state.ruleIsChecked || this.state.authorIsEmpty || this.state.textIsEmpty}
                >ДОБАВИТЬ НОВОСТЬ</button>
            </form>
        )
    }
});

var News = React.createClass({
    getInitialState: function () {
        return{
            counter:0
        }
    },

    propTypes:{
        data:React.PropTypes.array.isRequired
    },

    render: function () {
        var data = this.props.data;
        var newsTemplate;

        if (data.length > 0){
            newsTemplate = data.map(function (item, index) {
                return(
                    <div key={index}>
                        <Article className="article" data={item} />
                    </div>
                )
            });
            return (
                <div className="news">
                    {newsTemplate}
                    <strong className={data.length > 0? '':'none'}></strong> Всего новостей: {data.length}
                </div>
            )
        }else{
            newsTemplate = <p>No news, sorry</p>
        }
    }
});

var App = React.createClass({
    getInitialState:function () {
        return{news: my_news}
    },

    componentDidMount:function () {
        var self = this;
        window.ee.addListener('News.add', function (item) {
            var nextNews = item.concat(self.state.news);
            self.setState({news:nextNews});
        })
    },

    componentWillMount:function () {
        window.ee.removeListener('News.add');
    },

    render: function () {
        return(
            <div className="app">
                <h3>Новости</h3>
                <Add />
                <News data={this.state.news}/>
            </div>
        )
    }
});

module.exports = App;