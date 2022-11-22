<template>
  <div id="login-view-div">
    <div id="login-div" class="w-50">
			<h1>로그인</h1>
      <form @submit.prevent="logIn">
        <label for="username" class="my-2">아이디</label><br />
        <input
          type="text"
          id="username"
          class="w-100 mb-5"
          v-model="username"
        /><br />

        <label for="password" class="mb-2">비밀번호</label><br />
        <input
          type="password"
          id="password"
          class="w-100 mb-5"
          v-model="password"
        /><br />

        <input type="submit" value="로그인" class="btn btn-secondary" />
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
  background-color: pink;
  padding: 3% 5%;
  display: flex;
  flex-direction: row;
	justify-content: center;
}

#login-div {
	background-color: plum;
	padding: 3% 5%;
	border-radius: 15px;
	box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.1);
}

#login-div input {
	border-radius: 5px;
}
</style>
