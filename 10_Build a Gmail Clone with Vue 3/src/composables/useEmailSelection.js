/* Non-persisted global State */

/* composables are functions that can be reused in multiple setup() functions */

import { reactive } from 'vue';
import axios from 'axios';

//the Set lets you store unique values of any type; the ordering is not important
let emailSet = new Set()

export const useEmailSelection = function() {
  //making Set reactive, using the new Vue 3 Reactivity API
  const emails = reactive(emailSet)

  //toggle selection
  const toggle = (id) => {
    if(emails.has(id)) {
      emails.delete(id)
    } else {
      emails.add(id);
    }
  }

  //empty the Set of emails
  const clear = () => {
    emails.clear();
  }

  //add multiple items to Set
  const addMultiple = (newEmails) => {
    newEmails.forEach(email => {
      emails.add(email)
    })
  }
  
  //abstract function that handles looping through the emails, calling the given function for each, then saving it
  const forSelected = (fn) => {
    emails.forEach(email => {
      fn(email)
      //in production, it may be worthwhile to make the save functionality happen outside the loop in order to improve performance and reduce number of API calls
      axios.put(`http://localhost:3000/emails/${email.id}`, email)
    })
  }  
    
  const markRead = () => forSelected(e => e.read = true ) //call forSelected with the function to be called on each selected email
 
  const markUnread = () => forSelected(e => e.read = false ) //call forSelected with the function to be called on each selected email
  
  const archive = () => { 
    forSelected(e => e.archived = true); //call forSelected with the function to be called on each selected email
    clear(); //call to clear to archive, since they’ll no longer be on that screen
  }
  const moveToInbox = () => { 
    forSelected(e => e.archived = false); //call forSelected with the function to be called on each selected email
    clear(); //call to clear to archive, since they’ll no longer be on that screen
  }

  return {
    emails,
    toggle,
    clear,   
    addMultiple,
    markRead,
    markUnread,
    archive,
    moveToInbox
  }
}

export default useEmailSelection;