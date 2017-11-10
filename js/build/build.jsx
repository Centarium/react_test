const Actions = props =>
    <div className="Actions" >
        <span tabIndex="0" className="ActionsInfo" title="More info" onClick={props.onAction.bind(null,'info')}>
            &#8505;
        </span>
        <span tabIndex="0" className="ActionsEdit" title="Edit" onClick={props.onAction.bind(null,'edit')}>
            &#10000;
        </span>
        <span tabIndex="0" className="ActionsDelete" title="Delete" onClick={props.onAction.bind(null,'delete')}>
            x
        </span>
    </div>

Actions.propTypes = {
    onAction: PropTypes.func,
};

Actions.defaultProps = {
    onAction: () => {},
};

export default Actions
class Dialog extends Component{
    componentWillUnmount(){
        document.body.classList.remove('DialogModalOpen')
    }

    componentDidMount(){
        if( this.props.modal ) {
            document.body.classList.add('DialogModalOpen');
        }
    }

    render(){
        return (
            <div className={this.props.modal ? 'Dialog DialogModal' : 'Dialog' }>
                <div className={this.props.modal ? 'DialogModalWrap' : null }>
                    <div className="DialogHelper">{this.props.helper}</div>
                    <div className="DialogBody">{this.props.children}</div>
                    <div className="DialogFooter">
                        {
                            this.props.hasCancel
                            ? <span
                               className="DialogDismiss"
                               onClick={this.props.onAction.bind(this,'dismiss')}>Cancel</span>
                            : null
                        }
                        <Button onClick={this.props.onAction.bind(this,this.props.hasCancel ? 'confirm' : 'dismiss' )}>
                            {this.props.confirmLabel}
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

Dialog.propTypes ={
    header: PropTypes.string.isRequired,
    confirmLabel: PropTypes.string,
    modal: PropTypes.bool,
    onAction: PropTypes.func,
    hasCancel: PropTypes.bool
};

Dialog.defaultProps = {
    confirmLabel: 'ok',
    modal: false,
    onAction: () => {},
    hasCancel: true
};

export default Dialog
class Form extends Component {

    getPrefilled(field)
    {
        return  this.props.initialData && this.props.initialData[field.id];
    }

    getData(){
        let data={};
        this.props.fields.forEach(
            field => data[field.id] = this.refs[field.id].getValue()
        );
        return data;
    }

    getFormRowReadonly(field)
    {
        let prefilled = this.getPrefilled(field);

        return <div className="FormRow" key={field.id}>
            <span className="FormLabel">{field.label}</span>
            {
                field.type === 'rating'
                    ? <Rating readonly={true} defaultValue={parseInt(prefilled,10)} />
                    :<div>{prefilled}</div>
            }
        </div>;
    }

    getFormRow(field)
    {
        let prefilled = this.getPrefilled(field);

        return <div className="FormRow" key={field.id}>
            <label className="FormLabel" htmlFor={field.id}> {field.label}: </label>
            <FormInput {...field} ref={field.id} defaultValue={prefilled} />
        </div>;
    }

    render() {

        return (
            <form className="Form">{this.props.fields.map(field=>{
                let prefilled = this.getPrefilled(field);
                    if(!this.props.readonly)
                    {
                        return (this.getFormRow(field));
                    };
                    if(!prefilled){
                        return null;
                    }
                    return (this.getFormRowReadonly(field));
            }, this)} </form>
        );
    }
}

Form.propTypes = {
    fields: PropTypes.arrayOf( PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        type: PropTypes.string,
        options: PropTypes.arrayOf(PropTypes.string)
    })).isRequired,
    initialData: PropTypes.object,
    readonly: PropTypes.bool
};

export default Form
class FormInput extends Component {
    getValue() {
        
        return 'value' in this.refs.input
        ? this.refs.input.value
        : this.refs.input.getValue();
        
    }
    render() {

        const common = {
            id: this.props.id,
            ref: 'input',
            defaultValue: this.props.defaultValue
        };
        switch( this.props.type )
        {
            case 'year' : return(
                <input {...common} type="number" defaultValue={this.props.defaultValue || new Date().getFullYear() } />
            );
            case 'suggest' :
                return <Suggest {...common} options={this.props.options} />;
            case 'rating' : return (
                <Rating {...common} defaultValue={parseInt(this.props.defaultValue, 10)} />
            );
            case 'text' : return <textarea {...common} />;
            default : return <input {...common} type="text" />
        }

    }
}

FormInput.propTypes = {
    type: PropTypes.oneOf(['year','suggest','rating','text','input']),
    id: PropTypes.string,
    options: PropTypes.array,
    defaultValue: PropTypes.any
};

export default FormInput
import classNames from 'classnames';
import  {Component, PropTypes} from 'react';

class Logo extends React.Component {
    render() {
        return <div className="Logo"/>;;
    }
};
class Rating extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            rating: props.defaultValue,
            tmpRating: props.defaultValue
        };
    }

    getValue(){
        return this.state.rating;
    }

    setTemp(rating){
        this.setState({tmpRating:rating});
    }

    setRating(rating){
        this.setState({
            tmpRating: rating,
            rating: rating
        });
    }

    reset(){
        this.setTemp(this.state.rating);
    }

    componentWillReceiveProps(nextProps)
    {
        this.setRating(nextProps.defaultValue);
    }

    render(){
        const stars =[];
        for(let i=1;i<=this.props.max;i++)
        {
            stars.push(
                <span
                    className={i <= this.state.tmpRating? 'RatingOn' :null}
                    key={i}
                    onClick={!this.props.readonly && this.setRating.bind(this,i) }
                    onMouseOver={!this.props.readonly && this.setTemp.bind(this,i) }
                >&#9734;</span>
            );
        }

        return(
            <div className={classNames({'Rating' : true, 'RatingReadonly': this.props.readonly,})}
                onMouseOut={this.reset.bind(this)}>
                {stars}
                {
                    this.props.readonly || !this.props.id
                    ? null
                    : <input type="hidden" id={this.props.id} value={this.state.rating}/>
                }
            </div>
        );;
    }
}

Rating.propTypes = {
    defaultValue: PropTypes.number,
    readonly: PropTypes.bool,
    max: PropTypes.number,
};

Rating.defaultProps = {
    defaultValue: 0,
    max: 5
};

export default Rating
class Suggest extends Component {

    constructor(props)
    {
        super(props);
        this.state = {value: props.defaultValue};
    }

    getValue()
    {
        return this.state.value;
    }

    render(){
        const randomid = Math.random().toString(16).substring(2);
        return (
          <div>
              <input
                  list={randomid}
                  defaultValue={this.props.defaultValue}
                  ref="lowlevelinput"
                  onChange={e => this.setState({value: e.target.value})}
                  id={this.props.id} />
              <datalist id={randomid} > {this.props.options.map((item,idx)=>
                  <option value={item} key={idx} />)}
              </datalist>
          </div>
        );
    }
}

Suggest.propTypes = {
    options: PropTypes.arrayOf(PropTypes.string)
};

export default Suggest

function Button(props) {
    const cssclasses = classNames('Button', props.className);
    return props.href
        ? <a {...props} className={cssclasses} />
        : <button {...props} className={cssclasses} />;
}

Button.propTypes = {
    href : React.PropTypes.string,
};

ReactDOM.render(
    <div style={ {padding:'20px'} }>
        <h1>Component discoverer</h1>

        <h2>Logo</h2>
            <div style={{ display: 'inline-block', background:'purple' }}>
                <Logo />
            </div>

        <h2>Buttons</h2>
            <div>Button with onClick:
                <Button onClick={() => alert('ouch') }>Click me </Button>
            </div>
            <div>
                A link: <Button href="http://reactjs.com">Follow me</Button>
            </div>
            <div>
                Custom class name: <Button className="custom">I do nothing</Button>
            </div>

        <h2>Suggest</h2>
            <div><Suggest options={['eenie','meenie','miney','mo']} /> </div>

        <h2>Rating</h2>
            <div>No initial value: <Rating /> </div>
            <div>Initial value 4: <Rating defaultValue={4}/></div>
            <div>This one goes to 11: <Rating max={11} /> </div>
            <div>Read-only: <Rating readonly={true} defaultValue={3}/></div>

        <h2>Form inputs</h2>
        <table>
            <tbody>
            <tr>
                <td>Vanilla input</td>
                <td><FormInput /></td>
            </tr>
            <tr>
                <td>Prefilled</td>
                <td><FormInput defaultValue="It`s like a default" /></td>
            </tr>
            <tr>
                <td>Year</td>
                <td><FormInput type="year" /></td>
            </tr>
            <tr>
                <td>Rating</td>
                <td><FormInput type="rating" defaultValue={4}/> </td>
            </tr>
            <tr>
                <td>Suggest</td>
                <td><FormInput type="suggest" options={['red','green','blue']} defaultValue="green" /> </td>
            </tr>
            <tr>
                <td>Vanilla textarea</td>
                <td><formInput type="text" /></td>
            </tr>
            </tbody>
        </table>

        <h2>Form</h2>
            <Form fields={[
                {label: 'Rating', type:'rating', id:'rateme' },
                {label: 'Greetings', id:'freetext' }
                ]}
                  initialData={ {rateme:4, freetext:'Hello'} }
            />

        <h2>Actions</h2>
            <div><Actions onAction={type => alert(type) } /> </div>

        <h2>Dialog</h2>
            <div>
                <Dialog header="Out-of-the-box example" onAction={type => alert(type)}> Hello, dialog! </Dialog>
                <Dialog
                    header="No cancel, custom button"
                    hasCancel={false}
                    confirmLabel="Whatever"
                    onAction={type => alert(type)}>
                    Anything goes here, see:
                    <Button>A button </Button>
                </Dialog>
            </div>

    </div>,
    document.getElementById('pad')
);






























