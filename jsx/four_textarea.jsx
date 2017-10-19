class Logging
{
    log(event)
    {
        console.log(event.target.value);
        console.log(event.target.defaultValue);
    }
}

React.render(
    <textarea defaultValue="hello/nworld" onChange={Logging.log} />,
    document.getElementById('app1')
);

React.render(
    <textarea defaultValue={"hello\nworld"} onChange={Logging.log} ></textarea>,
    document.getElementById('app2')
);

React.render(
    <textarea onChange={Logging.log}> hello
            world
        </textarea>,
    document.getElementById('app3')
);

React.render(
    <textarea onChange={Logging.log} >{"hello\n\world"}</textarea>,
    document.getElementById('app4')
);
