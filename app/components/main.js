/**
 * Focus on this sample:
 * learn functions: store and delete new notes using state
 * button functionality - using touch opacity
 *** Touch opacity is the button and to add title, use <Text>, the styling will allow you to design it
 * text - input
 *
 * this is where the actual layout will be created
 * 
 * import the note array and make its constructor

 *Constructors are used to define the initial state of a component: events often occur in when the button is clicked. 
 *the event needs to be set up to the parent and not the child. (this is the binding)
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    TextInput
} from 'react-native';
import Note from './note'

export default class Main extends Component{
    constructor(props){
        super(props);
        this.state={
            noteArray: [],
            noteText: '',

        }
    }
    render() {
        let notes = this.state.noteArray.map((val, key) => {
           //loops through all notes
            return 
            <Note key ={key} keyval = {key} val ={val} deleteMethod = { () => this.deleteNote(key) } />
        });
        return (
            <View style={styles.container}>
                <View style = {styles.header}>
                    <Text style = {styles.headerText}>
                        - NOTER -
                    </Text>
                </View>
                <ScrollView style={styles.scrollContainer}>
                    {notes}
                </ScrollView>

                <View style ={styles.footer}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(noteText) => this.setState({noteText})}
                        value ={this.state.noteText}
                        placeholder='>note'
                        placeholderTextColor="white">

                    </TextInput>
                </View>

                <TouchableOpacity onPress ={this.addNote.bind(this)} style={styles.addButton}>
                    <Text style={styles.addButtonText}>
                        +
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
    addNote(){
        if(this.state.noteText){
            var d = new Date();
            this.state.noteArray.push({
                'date': d.getFullYear() + 
                "/" + (d.getMonth() +1) + 
                "/" + d.getDate(),
                'note': this.state.noteText
            });
            this.setState({noteArray: this.state.noteArray})
            this.setState({noteText: ''});
        }
    }
    deleteNote(key){
        this.state.noteArray.splice(key, 1); //splice to remove from array
        this.setState({noteArray: this.state.noteArray})
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    header: {
        backgroundColor: '#E91E63',
        alignItems: 'center',
        justifyContent:'center',
        borderBottomWidth: 10,
        borderBottomColor: '#ddd'
    },
    headerText: {
        color: 'white',
        fontSize: 18,
        padding: 26
    },
    scrollContainer: {
        flex: 1,
        marginBottom: 100
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10
    },
    textInput: {
        alignSelf: 'stretch',
        color: '#fff',
        padding: 20,
        backgroundColor: '#252525',
        borderTopWidth:2,
        borderTopColor: '#ededed'
    },
    addButton: {
        position: 'absolute',
        zIndex: 11, //will be on top of the notes
        right: 20,
        bottom: 90,
        backgroundColor: '#E91E63',
        width: 70,
        height: 70,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8
    },
    addButtonText: {
        color: '#fff',
        fontSize: 24
    }
});
