<template>
  <div class="container">
    <div class="card mb-3">
      <img
        class="card-img-top"
        v-bind:src="berita.url_image"
        alt="Gambar berita"
      />
      <div class="card-body">
        <h5 class="card-title">{{ berita.judul }}</h5>
        <p class="card-text" style="font-size: 12px">{{ berita.caption }}</p>
        <hr />
        <div v-html="berita.isi" class="card-text"></div>
        <p class="card-text">
          <small class="text-muted float-right">{{ berita.tanggal }}</small>
        </p>
      </div>
      <router-link to="/home" class="btn btn-primary btn-block btn-sm"
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
      berita: {
        judul: "",
        caption: "",
        isi: "",
        tanggal: "",
        url_image: "",
      },
      imageData: null,
    };
  },

  created() {
    const ref = firebase
      .firestore()
      .collection("berita")
      .doc(this.$route.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.key = doc.id;
        this.berita = doc.data();
      } else {
        alert("Berita tidak ditemukan!");
      }
    });
  },
};
</script>