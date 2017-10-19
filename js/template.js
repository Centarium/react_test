"use strict";

var headers = ["Book", "Author", "Language", "Published", "Sales"];

var data = [["The Lord of the Rings", "J. R. R. Tolkien", "English", "1954–1955", "150 million"], ["Le Petit Prince (The Little Prince)", "Antoine de Saint-Exupéry", "French", "1943", "140 million"], ["Harry Potter and the Philosopher's Stone", "J. K. Rowling", "English", "1997", "107 million"], ["And Then There Were None", "Agatha Christie", "English", "1939", "100 million"], ["Dream of the Red Chamber", "Cao Xueqin", "Chinese", "1754–1791", "100 million"], ["The Hobbit", "J. R. R. Tolkien", "English", "1937", "100 million"], ["She: A History of Adventure", "H. Rider Haggard", "English", "1887", "100 million"]];

var Excel = React.createClass({
    displayName: "Excel",

    getInitialState: function getInitialState() {
        return {
            data: this.props.initialData,
            sortby: null,
            descending: false,
            edit: null,
            search: false
        };
    },

    propTypes: {
        headers: React.PropTypes.arrayOf(React.PropTypes.string),
        initialData: React.PropTypes.arrayOf(React.PropTypes.arrayOf(React.PropTypes.string))
    },

    _sort: function _sort(e) {
        var column = e.target.cellIndex;
        var data = this.state.data.slice();
        var descending = this.state.sortby === column && !this.state.descending;
        data.sort(function (a, b) {

            return descending ? a[column] < b[column] ? 1 : -1 : a[column] > b[column] ? 1 : -1;
        });
        this.setState({
            data: data,
            descending: descending,
            sortby: column
        });
    },

    render: function render() {
        var state = this.state;

        return React.createElement(
            "table",
            null,
            React.createElement(
                "thead",
                { onClick: this._sort },
                React.createElement(
                    "tr",
                    null,
                    this.props.headers.map(function (title, idx) {
                        if (state.sortby === idx) {
                            title += state.descending ? " ↑" : "↓";
                        }
                        return React.createElement(
                            "th",
                            { key: idx },
                            title
                        );
                    })
                )
            ),
            React.createElement(
                "tbody",
                null,
                state.data.map(function (row, idx) {
                    return React.createElement(
                        "tr",
                        { key: idx },
                        row.map(function (cell, idx) {
                            return React.createElement(
                                "td",
                                { key: idx },
                                cell
                            );
                        })
                    );
                })
            )
        );
    }
});

ReactDOM.render(React.createElement(Excel, {
    headers: headers,
    initialData: data
}), document.getElementById("app"));