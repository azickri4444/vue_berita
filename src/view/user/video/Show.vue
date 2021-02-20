<template>
  <div class="container">
    <div class="card mb-3">
      <video class="card-img-top" v-bind:src="video.video_url" controls></video>
      <div class="card-body">
        <p class="card-text" style="font-size: 14px">{{ video.nama }}</p>
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
      video: {
        nama: "",
        caption: "",
      },
      imageData: null,
    };
  },

  created() {
    const ref = firebase
      .firestore()
      .collection("video")
      .doc(this.$route.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.key = doc.id;
        this.video = doc.data();
      } else {
        alert("video tidak ditemukan!");
      }
    });
  },
};
</script>