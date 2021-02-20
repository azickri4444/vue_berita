<template>
  <div class="container-fluid">
    <h3>SEMUA VIDEO</h3>
    <hr />

    <div class="row">
      <div class="col-sm-4" v-for="video in videos" :key="video.key">
        <div class="card mb-3">
          <video
            v-bind:src="video.video_url"
            width="100%"
            height="100%"
            controls
          ></video>
          <div class="card-body">
            <p class="card-text" style="font-size: 14px">
              <span class="badge badge-primary">{{ video.nama }}</span>
            </p>
            <hr />
            <span
              class="text-primary"
              style="font-size: 14px; cursor: pointer"
              @click.stop="show_video(video.key)"
              >Tonton Full Layar</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import router from "../../../router";

export default {
  data() {
    return {
      videos: [],
      vid: firebase.firestore().collection("video"),
    };
  },

  created() {
    this.vid.onSnapshot((querySnapshot) => {
      this.videos = [];
      querySnapshot.forEach((vid) => {
        this.videos.push({
          key: vid.id,
          nama: vid.data().nama,
          video_url: vid.data().video_url,
        });
      });
    });
  },

  methods: {
    show_video(videos) {
      console.log(videos);
      router.push({
        name: "guest-nonton-video",
        params: {
          id: videos,
        },
      });
    },
  },
};
</script>