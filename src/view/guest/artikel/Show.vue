<template>
  <div class="container">
    <div class="card mb-3">
      <div class="card-body">
        <h5 class="card-title">{{ artikel.judul }}</h5>
        <hr />
        <div v-html="artikel.isi" class="card-text"></div>
        <p class="card-text">
          <small class="text-muted float-right">{{ artikel.tanggal }}</small>
        </p>
      </div>
      <router-link to="/" class="btn btn-primary btn-block btn-sm"
        >Kembali</router-link
      >
    </div>
    <br /><br />
  </div>
</template>

<script>
import firebase from "firebase";
// import router from "../../../router";

export default {
  data() {
    return {
      key: this.$route.params.id,
      artikel: {
        judul: "",
        isi: "",
        tanggal: "",
      },
    };
  },

  created() {
    const ref = firebase
      .firestore()
      .collection("artikel")
      .doc(this.$route.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.key = doc.id;
        this.artikel = doc.data();
      } else {
        alert("Artikel tidak ditemukan!");
      }
    });
  },
};
</script>