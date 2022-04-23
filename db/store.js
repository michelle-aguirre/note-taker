const util = require('util');
const fs = require('fs');
const uuid = require('uuid');
const readFileMethod = util.promisify(fs.readFile);
const writeFileMethod = util.promisify(fs.writeFile);

class Store{
     read(){
         return readFileMethod('db/db.json', 'utf8');
     }
     write(){
         return writeFileMethod('db/db.json', JSON.stringify(note));
     }
     getNotes(){
         return this.read().then((notes)=>{
             let displayNotes;
             try {
                 displayNotes = [].concat(JSON.parse(notes));
             } catch (error) {
                 displayNotes = [];
             }
             return displayNotes;
         }) ;
     }
     addNote(note){
         const { title, text} = note;
         const newNote = {title, text, id: uuid.v1};
         return this.getNotes()
         .then((notes)=> [...notes, newNote])
         .then((updatedNotes)=> this.write(updatedNotes))
         .then(()=> newNote);
     }
     removeNote(id){
        return this.getNotes()
        .then((notes)=> notes.filter((note)=> note.id !== id))
        .then((filteredNotes)=> this.write(filteredNotes));
    }
}
module.exports= new Store();