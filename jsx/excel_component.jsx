import Logo from '../js/Logo.js';
import React, {Component,PropTypes} from 'react';
import classNames from 'classnames';

class Excel extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            data: this.props.initialData,
            sortby: null,
            descending: false,
            edit: null,
            dialog: null
        };
    }

    componentWillReceiveProps(nextProps)
    {
        this.setState({data: nextProps.initialData});
    }

    _fireDataChange(data)
    {
        this.props.onDataChange(data);
    }
    
    _sort(key)
    {
        let data = Array.from(this.state.data);
        const descending = this.state.sortby === key && !this.state.descending;
        data.sort(function (a,b) {
            return descending
                ? (a[column] < b[column] ? 1: -1 )
                : (a[column] > b[column] ? 1: -1 );
        });
        this.setState({
            data: data,
            sortby: key,
            descending: descending
        });
        this._fireDataChange(data);
    }

    _showEditor(e){
        this.setState({edit: {
            row: parseInt(e.target.dataset.row, 10),
            key: e.target.dataset.key
        }});
    }

    _save(e){
        e.preventDefault();
        const value = this.refs.input.getValue();
        let data  = Array.from(this.state.data);
        data[this.state.edit.row][this.state.edit.key] = value;
        this.setState({
            edit: null,
            data: data
        });
        this._fireDataChange(data);
    }

    _actionClick(rowidx, action)
    {
        this.setState({dialog: {type:action,idx: rowidx}});
    }

    _closeDialog()
    {
        this.setState({dialog: null});
    }

    _deleteConfirmationClick(action)
    {
        if(action === 'dismiss')
        {
            this._closeDialog();
            return;
        }
        let data = Array.from(this.state.data);
        data.splice(this.state.dialog.idx, 1);
        this.setState({
            dialog: null,
            data: data
        });
        this._fireDataChange(data);
    }

    _saveDataDialog(action)
    {
        if(action === 'dismiss')
        {
            this._closeDialog();
            return;
        }
        let data = Array.from(this.state.data);
        data[this.state.dialog.idx] = this.refs.form.getData();
        this.setState({
            dialog:null,
            data:data
        });
        this._fireDataChange(data);
    }

    _renderDeleteDialog(){
        const first = this.state.data[this.state.dialog.idx];
        const nameguess = first[Object.keys(first)[0]];
        return (
            <Dialog
                modal={true}
                header="Confirm deletion"
                confirmLabel="Delete"
                onAction={this._deleteConfirmationClick().bind(this)}>
                {'Are you sure want to delete "${nameguess}"? '}
            </Dialog>
        );
    }

    _renderFormDialog(readonly){
        return(
            <Dialog
                modal={true}
                header={readonly ? 'Item info' : 'Edit item'}
                confirmLabel={readonly ? 'ok' : 'Save' }
                hasCancel={!readonly}
                onAction={this._saveDataDialog.bind(this)}>
                    <Form ref="form" fields={this.props.schema}
                     initialData={this.state.data[this.state.dialog.idx]}
                     readonly={readonly}/>
            </Dialog>
        )
    }

    _renderDialog(){
        if(!this.state.dialog){
            return null;
        }
        switch (this.state.dialog.type)
        {
            case 'delete': return this._renderDeleteDialog();
            case 'info' : return this._renderFormDialog(true);
            case 'edit' : return this._renderFormDialog();
            default: throw Error('Unexpected dialog type ${this.state.dialog.type} ')
        }
    }

    _renderTable(){
        return (
            <table>

                <thead>
                    <tr>
                        {
                            this.props.schema.map(item => {
                                if(!item.show){
                                    return null;
                                }
                                let title = item.label;
                                if( this.state.sortby === item.id ){
                                    title += this.state.descending ? '\u2191' : ' \u2193';
                                }
                                return (
                                    <th
                                        className={'schema-${item.id}'}
                                        key={item.id}
                                        onClick={this._sort.bind(this, item.id)}>
                                        {title}
                                    </th>
                                )
                            }, this)
                        }
                        <th className="ExcelNotSortable">Actions</th>
                    </tr>
                </thead>

                <tbody onDoubleClick={this._showEditor.bind(this)}>
                    {
                        this.state.data.map((row,rowidx) => {
                                return (
                                    <tr key={rowidx}>
                                        {Object.keys(row).map((cell,idx) =>
                                            {
                                                const schema = this.props.schema[idx];
                                                if(!schema || !schema.show){
                                                    return null;
                                                }
                                                const isRating = schema.type === 'rating';
                                                const edit = this.state.edit;
                                                let content = row[cell];
                                                    if(!isRating && edit && edit.row === rowidx && edit.key === schema.id)
                                                    {
                                                        content = (
                                                            <form onSubmit={this._save().bind(this)}>
                                                                <FormInput ref="input" {...schema} defaultValue={content}/>
                                                            </form>
                                                        );
                                                    } else if(isRating)
                                                    {
                                                        content = <Rating readonly={true} defaultValue={Number(content)} />
                                                    }
                                                    return (
                                                        <td
                                                            className={classNames({
                                                                ['schema-${schema.id}']: true,
                                                                'ExcelEditable' : !isRating,
                                                                'ExcelDataLeft' : schema.align === 'left',
                                                                'ExcelDataRight' : schema.align === 'right',
                                                                'ExcelDataCenter' : schema.align !== 'left' && schema.align !== 'right'
                                                            })}
                                                            key={idx}
                                                            data-row={rowidx}
                                                            data-key={schema.id}
                                                        >{content}</td>
                                                    );
                                            }, this )}
                                        <td className="ExcelDataCenter">
                                            <Actions onAction={this._actionClick.bind(this,rowidx)} />
                                        </td>
                                    </tr>
                                );
                            }, this)
                    }
                            );
                        });
                        }, this)}
                </tbody>

            </table>
        );
    }

    render(){
        return(
            <div className="Excel">
                {this._renderTable()}
                {this._renderDialog()}
            </div>
        );
    }
}

var headers = localStorage.getItem('headers');
var data = localStorage.getItem('data');
if (!headers) {
    headers = ['Title', 'Year', 'Rating', 'Comments'];
    data = [['Test', '2015', '3', 'meh']];
}

Excel.propTypes = {
    schema: PropTypes.arrayOf(
        PropTypes.object
    ),
    initialData: PropTypes.arrayOf(
        PropTypes.object
    ),
    onDataChange: PropTypes.func
};


ReactDOM.render(
    <div>
        <h1>
            <Logo /> Welcome to Excel!
        </h1>
        <Excel headers={headers} initialData={data} />
    </div>,
    document.getElementById('excel')
);

export default Excel




























