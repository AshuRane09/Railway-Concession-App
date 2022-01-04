<template>
  <div id="signup">
    <div class="signup-form">
      <form @submit.prevent="onSubmit">
        <div class="input" :class="{invalid: $v.firstname.$error}">
          <label for="firstname">Firstname</label>
          <input
                  type="text"
                  id="firstname"
                  @blur="$v.firstname.$touch()"
                  v-model="firstname">
        </div>
        <div class="input" :class="{invalid: $v.lastname.$error}">
          <label for="lastname">Lastname</label>
          <input
                  type="text"
                  id="lastname"
                  @blur="$v.lastname.$touch()"
                  v-model="lastname">
        </div>
        <div class="input" :class="{invalid: $v.username.$error}">
          <label for="username">Mail</label>
          <input
                  type="text"
                  id="username"
                  @blur="$v.username.$touch()"
                  v-model="username">
          <p v-if="!$v.username.email">Please provide a valid email address.</p>
        </div>      
        <div class="input" :class="{invalid: $v.password.$error}">
          <label for="password">Password</label>
          <input
                  type="password"
                  id="password"
                  @blur="$v.password.$touch()"
                  v-model="password">
          <p v-if="!$v.password.minLen">Minimum length of password is 6.</p>
        </div>
        <div class="input" :class="{invalid: $v.confirmPassword.$error}">
          <label for="confirm-password">Confirm Password</label>
          <input
                  type="password"
                  id="confirm-password"
                  @blur="$v.confirmPassword.$touch()"
                  v-model="confirmPassword">
        </div>

        <div class="submit">
          <button type="submit" :disabled="$v.$invalid">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import { email, required, minLength, sameAs} from 'vuelidate/lib/validators'

  export default {
    data () {
      return {
        firstname:'',
        lastname:'',
        username: '',
        password: '',
        confirmPassword: '',
      }
    },
    validations: {
      firstname: {
        required,
        minLen: minLength(1)
      },
      lastname: {
        required,
        minLen: minLength(1)
      },
      username: {
        required,
        email,
      },
      password: {
        required,
        minLen: minLength(6)
      },
      confirmPassword: {
        sameAs: sameAs('password')
      },
    },
    methods: {
      onSubmit () {
        const forData = {
          firstname: this.firstname,
          lastname: this.lastname,
          username: this.username,
          password: this.password,
        }
        console.log(forData)
        this.$store.dispatch('signup',  {username: forData.username, password: forData.password, firstname:forData.firstname, lastname:forData.lastname})
      }
    }
  }
</script>

<style scoped>
  .signup-form {
    width: 400px;
    margin: 30px auto;
    border: 1px solid #eee;
    padding: 20px;
    box-shadow: 0 2px 3px #ccc;
  }

  .input {
    margin: 10px auto;
  }

  .input label {
    display: block;
    color: #4e4e4e;
    margin-bottom: 6px;
  }

  .input.inline label {
    display: inline;
  }

  .input input {
    font: inherit;
    width: 100%;
    padding: 6px 12px;
    box-sizing: border-box;
    border: 1px solid #ccc;
  }

  .input.inline input {
    width: auto;
  }

  .input input:focus {
    outline: none;
    border: 1px solid #521751;
    background-color: #eee;
  }

  .input.invalid label {
    color: red;
  }

  .input.invalid input {
    border: 1px solid red;
    background-color: #ffc9aa;
  }

  .input select {
    border: 1px solid #ccc;
    font: inherit;
  }

  .hobbies button {
    border: 1px solid #521751;
    background: #521751;
    color: white;
    padding: 6px;
    font: inherit;
    cursor: pointer;
  }

  .hobbies button:hover,
  .hobbies button:active {
    background-color: #8d4288;
  }

  .hobbies input {
    width: 90%;
  }

  .submit button {
    border: 1px solid #521751;
    color: #521751;
    padding: 10px 20px;
    font: inherit;
    cursor: pointer;
  }

  .submit button:hover,
  .submit button:active {
    background-color: #521751;
    color: white;
  }

  .submit button[disabled],
  .submit button[disabled]:hover,
  .submit button[disabled]:active {
    border: 1px solid #ccc;
    background-color: transparent;
    color: #ccc;
    cursor: not-allowed;
  }

  p{
    color:red;
  }
</style>