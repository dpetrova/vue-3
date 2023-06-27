<template>
  <!-- table with not archived emails -->
  <table class="mail-table">
    <tbody>
      <tr v-for="email in emails" 
          :key="email.id"
          :class="[email.read ? 'read': '', 'clickable']"
          @click="openEmail(email)">
        <!-- select checkbox -->
        <td>
          <!-- use ".stop" event modifier to stop the click event's propagation (otherwise it will be propagated to parent <tr> and openEmail will be triggered) -->
          <input 
            type="checkbox"
            :checked="emailSelection.emails.has(email)"
            @click.stop="emailSelection.toggle(email)" />
        </td>
        <!-- from -->
        <td>{{email.from}}</td>
        <!-- subject -->
        <td>
          <p><strong>{{email.subject}}</strong> - {{email.body}}</p>
        </td>
        <!-- date -->
        <td class="date">{{format(new Date(email.sentAt), 'MMM do yyyy')}}</td>
        <!-- archive btn -->
        <td><button @click="archiveEmail(email)">Archive</button></td>
      </tr>
    </tbody>
  </table>

  <!-- modal with email details that is now opened -->
  <ModalView v-if="openedEmail" :closeModal="() => { openedEmail = null; }">    
    <MailView 
      :email="openedEmail"
      :changeEmail="(args) => changeEmail(openedEmail, args)" />
  </ModalView>
</template>

<script>
  import { format } from 'date-fns'; //use date utility library to format date (lightweight moment.js)
  import MailView from '@/components/MailView.vue';
  import ModalView from '@/components/ModalView.vue';
  import { useEmailSelection } from '../composables/useEmailSelection';
  import axios from 'axios';

  export default {
    props: {
      emails: {
        type: Array,
        required: true
      }
    },
    // use setup function instead of data function, because async/await doesn’t work with the data function 
    async setup(){
      return {
        format,
        openedEmail: null,
        emailSelection: useEmailSelection() //use a composable: it is a function that can be reused in multiple setup() functions
      }
    },
    components: {
      MailView,
      ModalView,
    },
    methods: {
      openEmail(email){
        this.openedEmail = email;

        if(email) {
          email.read = true
          this.updateEmail(email)
        }
      },
      archiveEmail(email){
        email.archived = true;
        this.updateEmail(email)
      },
      changeEmail(email, {indexChange, toggleArchive, toggleRead, save, closeModal}) { //use destructuring of object as second argument
        if(toggleArchive) { email.archived = !email.archived }
        if(toggleRead) { email.read = !email.read }
        if(save) { this.updateEmail(email) }
        if(closeModal) { this.openedEmail = null; return null; }
        if(indexChange) {
          let index = this.emails.findIndex(e => e == email);
          this.openEmail(this.emails[index + indexChange])
        }
      },
      updateEmail(email) {
        axios.put(`http://localhost:3000/emails/${email.id}`, email) //update email in db.json
      }
    }    
  }
</script>

<style scoped>

</style>