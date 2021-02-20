<template>
  <div class="App">
    <div class="vertical-center">
      <div class="inner-block">
        <div class="vue-template">
          <form @submit.prevent="forgetPassword">
            <h3>Lupa Password</h3>

            <div id="success" class="alert alert-success" style="display: none">
              Silahkan cek email anda.
            </div>

            <div id="error" class="alert alert-danger" style="display: none">
              Email tidak terdaftar!
            </div>

            <div class="form-group">
              <label>Email</label>
              <input
                type="email"
                class="form-control form-control-lg"
                v-model="user.email"
              />
            </div>

            <button type="submit" class="btn btn-dark btn-lg btn-block">
              Reset Password
            </button>

            <p class="forgot-password text-right p-3">
              <router-link to="/login">Kembali</router-link>
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
        email: "",
      },
    };
  },

  methods: {
    forgetPassword() {
      firebase
        .auth()
        .sendPasswordResetEmail(this.user.email)
        .then(() => {
          document.getElementById("success").style.display = "block";
          document.getElementById("error").style.display = "none";
          this.user = {
            email: "",
          };
        })
        .catch((error) => {
          console.log(error);
          document.getElementById("success").style.display = "none";
          document.getElementById("error").style.display = "block";
          // alert(error);
        });
    },
  },
};
</script>