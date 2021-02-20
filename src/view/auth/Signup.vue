<template>
  <div class="App">
    <div class="vertical-center">
      <div class="inner-block">
        <div class="vue-template">
          <form @submit.prevent="userRegistrasion">
            <h3>Daftar</h3>

            <div
              id="error"
              class="alert alert-danger"
              style="display: none"
            ></div>

            <div class="form-group">
              <label>Nama</label>
              <input
                type="text"
                class="form-control form-control-lg"
                v-model="user.nama"
              />
            </div>

            <div class="form-group">
              <label>Email</label>
              <input
                type="email"
                class="form-control form-control-lg"
                v-model="user.email"
              />
            </div>

            <div class="form-group">
              <label>Password</label>
              <input
                type="password"
                class="form-control form-control-lg"
                v-model="user.password"
              />
            </div>

            <button type="submit" class="btn btn-dark btn-lg btn-block">
              Daftar
            </button>

            <p class="forgot-password text-right p-3">
              Sudah punya akun?
              <router-link to="/login">Masuk</router-link>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      user: {
        nama: "",
        email: "",
        password: "",
      },
    };
  },

  methods: {
    userRegistrasion() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.user.email, this.user.password)
        .then((res) => {
          res.user
            .updateProfile({
              displayName: this.user.nama,
            })
            .then(() => {
              this.$router.push("/login");
            });
        })
        .catch((error) => {
          if (error.message == "The email address is badly formatted.") {
            document.getElementById("error").style.display = "block";
            document.getElementById("error").innerHTML = "Email tidak valid!";
          } else if (
            error.message == "Password should be at least 6 characters"
          ) {
            document.getElementById("error").style.display = "block";
            document.getElementById("error").innerHTML =
              "Password membutuhkan minimal 6 karakter";
          } else {
            document.getElementById("error").style.display = "block";
            document.getElementById("error").innerHTML = error.message;
          }
        });
    },
  },
};
</script>