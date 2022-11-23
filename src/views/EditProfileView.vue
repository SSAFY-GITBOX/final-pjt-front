<template>
  <div id="edit-profile-view-div">
    <div id="profile-image-div" class="my-4">
      <form @submit.prevent="updateImage" enctype="multipart/form-data">
        <div v-if="user?.profile_image_url">
          <img
            :src="profileImageUrl"
            id="preview-image"
            class="rounded-circle shadow"
            style="width: 200px; height: 200px"
          />
        </div>
        <div v-else>
          <img
            src="../assets/default_profile_image.png"
            id="preview-image"
            class="rounded-circle shadow"
            style="width: 200px; height: 200px"
          />
        </div>

        <h2 class="mt-4">{{ changedUsername }}</h2>
        <div id="image-change">
          <button id="delete-image" @clikc="deleteImage" >이미지 삭제</button>
          <div class="filebox">
            <label for="file" class="ms-2">이미지 변경</label>
            <input
              type="file"
              id="file"
              class="ms-5"
              @change="onChange"
            /><br />
          </div>
        </div>
        <input type="submit" value="적용하기" style="color: #F5F5DC" class="btn btn-warning mt-3" />
      </form>
    </div>

    <div id="username" class="mt-3">
      <details>
        <summary>아이디 변경</summary>
        <form @submit.prevent="updateUsername">
          <label for="username"> 새 아이디 : &nbsp; </label>
          <input
            type="text"
            id="username"
            class="ms-1 mt-2"
            v-model="inputUsername"
            style="width: 200px;
            border-radius: 20px;
            border: none;
            padding: 0px 20px;
            display: inline;
            text-align: center;"
          /><br /><br />
          <input type="submit" value="적용하기" style="color: #F5F5DC"  class="btn btn-warning" />
        </form>
      </details>
    </div>

    <div id="password" class="mt-5">
      <details>
        <summary>비밀번호 변경</summary>
        <form @submit.prevent="updatePassword">
          <label for="new_password" class="mt-4">&nbsp; 새 비밀번호 : &nbsp; </label>
          <input
            type="password"
            id="new_password"
            v-model="newPassword1"
            style="width: 200px;
            border-radius: 20px;
            border: none;
            padding: 0px 20px;
            display: inline;
            text-align: center;"
          /><br /><br />

          <label for="new_password_2"> 비밀번호 확인 : &nbsp; </label>
          <input
            type="password"
            id="new_password_2"
            v-model="newPassword2"
            style="width: 200px;
            border-radius: 20px;
            border: none;
            padding: 0px 20px;
            display: inline;
            text-align: center;"
          /><br /><br />

          <input type="submit" value="적용하기" style="color: #F5F5DC" class="btn btn-warning" />
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
					if (this.user?.profile_image_url && this.user?.profile_image_url.charAt(0) != "h") {
            this.profileImageUrl = `http://127.0.0.1:8000${this.user?.profile_image_url}`;
          }
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
					alert('프로필 이미지가 변경되었습니다.')
        })
        .catch((err) => {
          console.log(err);
        });
    },

		// 이미지 삭제
		deleteImage() {
			axios({
				method: "delete",
				url: `${ API_URL }/accounts/profile_image/${ this.userPk }/`,
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Token ${ this.$store.state.token }`,
				}
			})
				.then(() => {
					this.getUserInfo()
					this.profileImageUrl = null
				})
				.catch((err) => {
					console.log(err);
				})
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
          alert('아이디가 변경되었습니다.')
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
  background-color: #F5F5DC ;
  padding: 3% 5%;
  display: flex;
  flex-direction: column;
  text-align: center;
}

#image-change {
  display: flex;
  justify-content: center;
}

#delete-image {
  display: inline-block;
  padding: 0.5em 0.75em;
  color: #F5F5DC;
  font-size: inherit;
  line-height: normal;
  vertical-align: middle;
  background-color: #fdfdfd;
  cursor: pointer;
  border: 1px solid #ebebeb;
  background-color: rgba(51, 61, 81, 1.0);
  border-radius: 20px;
}

#delete-image:hover {
  transform: none;
  background-color: rgb(255, 193, 7) ;
}

.filebox label {
  display: inline-block;
  padding: 0.5em 0.75em;
  color: #F5F5DC;
  font-size: inherit;
  line-height: normal;
  vertical-align: middle;
  cursor: pointer;
  background-color: rgba(51, 61, 81, 1.0);
  border-radius: 20px;
}

.filebox label:hover {
  transform: none;
  background-color: rgb(255, 193, 7) ;
}

/* 인풋 파일 숨기기 */
.filebox input[type="file"] {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
</style>
