<template>
  <div id="profile-navbar">
    <nav class="navbar navbar-expand-md navbar-light">
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-3">
          <li class="nav-item">
            <a id="nav-acts" class="nav-link" :class="{selected: onGrass} " @click="viewActs">활동 내역</a>
          </li>
          <li class="nav-item">
            <a id="nav-movies" class="nav-link" :class="{selected: onLikeMovies}" @click="viewLikeMovies">찜한 영화</a>
          </li>
          <li class="nav-item">
            <a id="nav-articles" class="nav-link" :class="{selected: onLikeArticles}" @click="viewLikeArticles">좋아하는 게시글</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "ProfileNavbar",

	props: {
		onGrass: Boolean,
		onLikeMovies: Boolean,
		onLikeArticles: Boolean
	},

  methods: {
    viewActs() {
      this.$emit("view-acts");
    },

    viewLikeMovies() {
      this.$emit("view-like-movies");
    },

    viewLikeArticles() {
      this.$emit("view-like-articles");
    },
  },
};
</script>

<style>
#profile-navbar .navbar {
  display: flex;
}

#profile-navbar .nav-item {
  margin-right: 1rem;

}

#profile-navbar .nav-item:active {
  font-weight: bold;
}

#profile-navbar a {
  font-size: 22px;
  color: #2e3133;
}

#profile-navbar .nav-item:hover {
  cursor: pointer;
}

#profile-navbar .selected {
	font-weight: bold !important;
	color: #2e3133 !important;
}
</style>