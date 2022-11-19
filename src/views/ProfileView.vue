<template>
  <div class="container w-100 h-100 mx-3">

    <h2>{{ user.username }}</h2>

    <form @submit.prevent="imageUpload" enctype="multipart/form-data">
      <input type="file" id="file" value="프로필 이미지 수정" @change="onChange"><br><br>
      <div v-if="user.profile_image">
        <img
          :src="user.profile_image"
          class="rounded-circle"
          style="width: 200px; height: 200px;"
        >
      </div>
      <div v-else>
        <img
          class="rounded-circle"
          style="width: 200px; height: 200px;"
          id="preview-image"
          src="https://dummyimage.com/500x500/ffffff/000000.png&text=preview+image"
        >
      </div><br>
      <input type="submit" value="제출">
    </form>
    
  </div>
</template>

<script>
import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'ProfileView',

  data() {
    return {
      user: null,
      profileImage: null,
    }
  },

  created() {
    this.getUser()
  },

  methods: {
    getUser() {
      console.log('getUser')
      axios({
        method: 'get',
        url: `${API_URL}/accounts/user/`,
        headers: {
          Authorization: `Token ${ this.$store.state.token }`
        }
      })
        .then((res) => {
          this.user = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },

    imageUpload() {
      console.log('imageUpload')
      axios({
        method: 'post',
        url: `${API_URL}/accounts/profile_image/${this.user.pk}/`,
        data: {
          'profile_image': this.profileImage
        },
        headers: {
          Authorization: `Token ${ this.$store.state.token }`
        }
      })
        .then((res) => {
          console.log(res.data.profile_image)
          this.getUser()
        })
        .catch((err) => {
          console.log(err)
        })
    },

    // 파일이 바뀌면 미리보기 시켜주는 함수
    onChange(event) {
      console.log('onChange')
      if (event.target.files && event.target.files[0]) {
        this.profileImage = event.target.files[0]
        console.log('profileImage:', this.profileImage)

        const reader = new FileReader()

        reader.onload = e => {
          const previewImage = document.getElementById("preview-image")
          previewImage.src = e.target.result
        }

        reader.readAsDataURL(event.target.files[0])
      }
    }
  }
}
</script>

<style>

</style>