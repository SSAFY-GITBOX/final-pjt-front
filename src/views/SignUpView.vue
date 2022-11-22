<template>
  <div id="signup-view-div">
    <div id="signup-div" class="w-50">
      <h1>회원가입</h1>
    <form @submit.prevent="signUp">
      <label for="username" class="my-2">아이디</label><br>
      <input type="text" id="username" class="w-100 mb-5" v-model="username"><br>

      <label for="password1" class="mb-2">비밀번호</label><br>
      <input type="password" id="password1" class="w-100 mb-5" v-model="password1"><br>

      <label for="password2"> 비밀번호 확인 </label><br>
      <input type="password" id="password2" class="w-100 mb-5" v-model="password2"><br>

      <input type="submit" value="회원가입" class="btn btn-secondary">
    </form>
    </div>
    
  </div>
</template>
  
<script>
export default {
  name: 'SignUpView',

  data() {
    return {
      username: null,
      password1: null,
      password2: null,
    }
  },
  
  methods: {
    signUp() {
      const username = this.username
      const password1 = this.password1
      const password2 = this.password2

      const payload = {
        username,
        password1,
        password2,
      }
      
      this.$store.dispatch('signUp', payload)
    }
  }
}
</script>

<style>
#signup-view-div {
  background-color: pink;
  padding: 3% 5%;
  display: flex;
  flex-direction: row;
	justify-content: center;
}

#signup-div {
	background-color: plum;
	padding: 3% 5%;
	border-radius: 15px;
	box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.1);
}

#signup-div input {
	border-radius: 5px;
}
</style>