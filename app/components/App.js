var React = require('react');

var my_news = [
    {
        author: 'user1',
        text: 'I am the shadow, I am the light'
    },
    {
        author: 'user2',
        text: 'But I am definetely not alone, Well I\'m definitely not alone'
    },
    {
        author: 'user3',
        text: 'I need help in many ways'
    }
]

var Article = React.createClass({
    render: function () {
        var author = this.props.data.author,
            text = this.props.data.text;

        return(
            <div className="article">
                <p className="news__author">{author}:</p>
                <p className="news__text">{text}</p>
            </div>
        )
    }
});

var News = React.createClass({
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
            })
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
    render: function () {
        return(
            <div className="app">
                <h3>Новости</h3>
                <News data={my_news}/>
            </div>
        )
    }
});

module.exports = App;