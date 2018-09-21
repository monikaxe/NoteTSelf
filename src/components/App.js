import React, {Component} from 'react';
import {Form, FormControl, Button} from 'react-bootstrap';
import Note from './Node';
import {bake_cookie, read_cookie, delete_cookie} from 'sfcookies';

const cookie_key='NOTES';

class App extends Component{
    constructor(){
        super();

        this.state={
            text:'',
            notes:[]
        }
    }
    componentDidMount(){
        const notes=read_cookie(cookie_key);
        this.setState({notes} );
}

    submit(){
        const {notes, text} =this.state;
        notes.push({text});
        this.setState({notes});
        bake_cookie(cookie_key, this.state.notes);
    }
    render(){
        return(
            <div className="top">
                <h2>co dziś porabiamy?</h2>
                <Form inline>
                    <FormControl onChange={event=>this.setState({text: event.target.value})}/>
                    {' '}
                    <Button onClick={()=>this.submit()}>Zapisz</Button>
                </Form>
                {this.state.notes.map((note, index)=> {
                    return (
                        <Note key={index} note={note}/>
                    )
                })}
            </div>
        )
    }
}

export default App;