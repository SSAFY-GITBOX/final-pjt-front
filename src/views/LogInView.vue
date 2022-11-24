<template>
  <div id="login-view-div">
    <div id="login-div">
			<h1 class="mb-5">로그인</h1>
      <form @submit.prevent="logIn">
        <label for="username">아이디</label><br />
        <input type="text" id="username" v-model="username"/><br />

        <label for="password">비밀번호</label><br />
        <input type="password" id="password" v-model="password"/><br />

        <div class="login-btn-div">
          <input type="submit" value="로그인" class="login-view-btn"
          style="border-radius: 20px; margin-bottom: 10px; width: 50%;"/>
          <router-link
            class="login-view-btn"
            :to="{ name: 'SignUpView' }"
            style="border-radius: 20px; margin-bottom: 2rem; width: 50%;"
          >회원가입</router-link>
        </div>
        
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "LogInView",

  data() {
    return {
      username: null,
      password: null,
    };
  },

  methods: {
    logIn() {
      const payload = {
        username: this.username,
        password: this.password,
      };
      this.$store.dispatch("logIn", payload);
    },
  },
};
</script>

<style>
#login-view-div {
  background-color: #F5F5DC;
  padding: 10% 2%;
  display: flex;
  flex-direction: row;
	justify-content: center;
}

#login-div {
	width: 30%;
	background-color: #333D51;
	padding: 3% 3%;
	border-radius: 15px;
	box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.1);
  color:#F5F5DC;
}

#login-view-div label {
  margin-bottom: 0.2rem;
}

#login-view-div input {
  margin-bottom: 2rem;
  width: 85%;
}

#login-div input {
	border-radius: 5px;
}

.login-btn-div {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
}

.login-view-btn {
  background-color: #2e3133;
  color: #F5F5DC;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  margin: 0px;
  border: none;
  border-radius: 20px;
  text-decoration: none;
}

.login-view-btn:hover {
  color:#F5F5DC;
  transform: none;
  background-color: #D3AC2B;
}
</style>
