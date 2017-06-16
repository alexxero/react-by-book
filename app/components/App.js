var React = require('react');

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