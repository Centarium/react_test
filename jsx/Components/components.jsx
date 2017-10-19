import React, {PropTypes} from 'react';

class Button extends React.Component{
    constructor(props)
    {
        super(props);
    }
    render(props)
    {
        const cssclasses = classNames('Button',props.className);
        return props.href
            ? <a {...props} className={cssclasses} />
            : <button {...props} className={cssclasses} />;
    }
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

    </div>,
    document.getElementById('pad')
);;