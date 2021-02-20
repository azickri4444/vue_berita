<template>
  <div class="App">
    <div class="vertical-center">
      <div class="inner-block">
        <div class="vue-template">
          <form @submit.prevent="userLogin">
            <h3>Masuk Akun</h3>

            <div
              class="alert alert-danger"
              id="error"
              style="display: none"
            ></div>

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
                id="password"
                type="password"
                class="form-control form-control-lg"
                v-model="user.password"
              />
            </div>

            <button type="submit" class="btn btn-dark btn-lg btn-block">
              Masuk
            </button>

            <div class="forgot-password p-3">
              <router-link to="/signup">Belum punya akun?</router-link>
              <router-link to="/forgot-password" class="float-right"
                >Lupa Password?</router-link
              >
            </div>
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
        email: "",
        password: "",
      },
    };
  },

  methods: {
    userLogin() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.user.email, this.user.password)
        .then(() => {
          this.$router.push("/home");
          document.getElementById("error").style.display = "none";
        })
        .catch((error) => {
          if (
            error.message ==
            "There is no user record corresponding to this identifier. The user may have been deleted."
          ) {
            document.getElementById("error").style.display = "block";
            document.getElementById("error").innerHTML =
              "Email tidak terdaftar!";
          } else {
            document.getElementById("error").style.display = "block";
            document.getElementById("error").innerHTML = "Password salah!";
          }
        });
    },
  },
};
</script>