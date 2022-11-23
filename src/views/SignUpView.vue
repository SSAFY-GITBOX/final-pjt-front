<template>
  <div id="signup-view-div">
    <div id="signup-div" class="w-50">
      <h1 class="mb-5">회원가입</h1>
    <form @submit.prevent="signUp">
      <label for="username">아이디</label><br>
      <input type="text" id="username" v-model="username"><br>

      <label for="password1">비밀번호</label><br>
      <input type="password" id="password1" v-model="password1"><br>

      <label for="password2"> 비밀번호 확인 </label><br>
      <input type="password" id="password2" v-model="password2"><br>

      <input type="submit" value="회원가입" class="signup-btn"
      style="border-radius: 20px; width: 50%;">
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
  background-color: #F5F5DC;
  padding: 10% 2%;
  display: flex;
  flex-direction: row;
	justify-content: center;
}

#signup-div {
	background-color: #333D51;
	padding: 3% 3%;
	border-radius: 15px;
	box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.1);
  color:#F5F5DC;
}

#signup-view-div label {
  margin-bottom: 0.2rem;
}

#signup-view-div input {
  margin-bottom: 2rem;
  width: 70%;
}

.signup-btn {
  background-color: #2e3133;
  color: #F5F5DC;
  height: 32px;
  border: none;
  padding: 0px 16px;
  margin-top: 30px;
  text-decoration: none;
}

.signup-btn:hover {
  transform: none;
  background-color: #D3AC2B;
}

#signup-div input {
	border-radius: 5px;
}
</style>