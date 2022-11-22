<template>
  <div id="edit-profile-view-div">
		<div id="image" class="my-4">
			<form @submit.prevent="updateImage" enctype="multipart/form-data">
				<div v-if="user?.profile_image">
					<img
						:src="user?.profile_image"
						class="rounded-circle shadow"
						style="width: 200px; height: 200px"
					/>
				</div>
				<div v-else>
					<img
						class="rounded-circle shadow"
						style="width: 200px; height: 200px"
						id="preview-image"
						src="https://dummyimage.com/500x500/ffffff/000000.png&text=preview+image"
					/>
				</div>

				<h2 class="my-3"> {{ changedUsername }} </h2>

				<br />
				<input type="file" id="file" @change="onChange" /><br /><br />
				<input type="submit" value="update image" class="btn btn-secondary" />
			</form>
		</div>

		<div id="username" class="my-5">
			<details>
				<summary>change username</summary>
				<form @submit.prevent="updateUsername">
					<label for="username" class="mt-4"> username : &nbsp; </label>
					<input type="text" id="username" v-model="inputUsername" /><br /><br />
					<input type="submit" value="update username" class="btn btn-secondary" />
				</form>
			</details>
		</div>

		<div id="password" class="my-5">
			<details>
				<summary>change password</summary>
				<form @submit.prevent="updatePassword">
					<label for="new_password" class="mt-4"> new password : &nbsp; </label>
					<input type="password" id="new_password" v-model="newPassword1" /><br /><br />

					<label for="new_password_2"> new password confirmation : &nbsp; </label>
					<input type="password" id="new_password_2" v-model="newPassword2" /><br /><br />

					<input type="submit" value="update password" class="btn btn-secondary" />
				</form>
			</details>
		</div>
  </div>
</template>

<script>
import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export default {
  name: "EditProfileView",

	data() {
		return {
			userPk: null,
			user: null,

			uploadImage: null,
			profileImageUrl: null,

			changedUsername: null,
			inputUsername: null,

			password: null,
      newPassword1: null,
      newPassword2: null,
		}
	},

	created() {
		this.userPk = this.$store.state.userPk
		this.getUserInfo()
	},

  methods: {
		// 유저 정보 불러오기
		getUserInfo() {
      axios({
        method: 'get',
        url: `${ API_URL }/accounts/profile/${ this.userPk }/`,
        headers: {
          Authorization: `Token ${ this.$store.state.token }`
        }
      })
        .then((res) => {
          this.user = res.data.user
					this.changedUsername = this.user.username
					this.profileUrl = this.user.profile_image_url? this.user.profile_image_url : null
        })
        .catch((err) => {
          console.log(err)
        })
    },

		// 프로필 이미지 미리보기
		onChange(event) {
			if (event.target.files && event.target.files[0]) {
				const fd = new FormData()
				fd.append('image', event.target.files[0])
				this.uploadImage = fd

				const reader = new FileReader();

				reader.onload = (e) => {
					const previewImage = document.getElementById("preview-image");
					previewImage.src = e.target.result;
				};

				reader.readAsDataURL(event.target.files[0]);
			}
		},

		// 프로필 이미지 업데이트
    updateImage() {
      axios({
        method: "post",
        url: `${ API_URL }/accounts/profile_image/${ this.userPk }/`,
        data: this.uploadImage,
        headers: {
					'Content-Type': 'multipart/form-data',
          Authorization: `Token ${ this.$store.state.token }`,
        },
      })
        .then(() => {
					this.getUserInfo()
					this.profileImageUrl = `http://127.0.0.1:8000${this.user?.profile_image_url}`
        })
        .catch((err) => {
          console.log(err);
        });
    },

		// 유저 이름 업데이트
		updateUsername() {
			axios({
				method: 'put',
				url: `${ API_URL }/accounts/user/`,
				headers: {
					Authorization: `Token ${ this.$store.state.token }`
				},
				data: {
					username: this.inputUsername
				}
			})
				.then((res) => {
					this.changedUsername = res.data.username
				})
				.catch((err) => {
					console.log(err)
				})
		},

		// 유저 비밀번호 업데이트
		updatePassword() {
				axios({
					method: 'post',
					url: `${ API_URL }/accounts/password/change/`,
					headers: {
						Authorization: `Token ${ this.$store.state.token }`
					},
					data: {
						new_password1: this.newPassword1,
						new_password2: this.newPassword2,
					}
				})
					.then((res) => {
						console.log(res)
						alert('비밀번호가 변경되었습니다.')
						this.$store.dispatch('logOut')
						this.$router.go()
					})
					.catch((err) => {
						console.log(err)
					})
		},
  },
}
</script>

<style>
	#edit-profile-view-div {
		background-color: pink;
		padding: 3% 5%;
		display: flex;
		flex-direction: column;
		text-align: start;
	}
</style>