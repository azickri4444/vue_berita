<template>
  <div class="container" style="padding: 10px">
    <div class="card">
      <div class="card-body">
        <h5>Tambah Video</h5>
        <hr />

        <div class="form-group">
          <label>Nama Video</label>
          <input
            id="nama"
            type="text"
            class="form-control"
            v-model="video.nama"
          />
        </div>

        <div class="form-group">
          <label>Video</label>
          <input
            id="video"
            type="file"
            class="form-control"
            accept=".mp4, .mkv"
            @change="onUpload"
          />
        </div>

        <div id="loader" style="display: none">
          <div class="alert alert-primary d-flex">
            <div
              class="spinner-border"
              role="status"
              style="width: 27px; height: 27px"
            >
              <span class="sr-only">Loading...</span>
            </div>
            <span style="margin-left: 10px">Sedang Upload..</span>
          </div>
        </div>

        <div class="form-group">
          <button
            class="btn btn-sm btn-success float-right"
            @click="save"
            id="save"
          >
            Simpan
          </button>
          <button
            class="btn btn-sm btn-primary float-right mr-2"
            id="back_load"
            style="display: none"
            disabled
          >
            Kembali
          </button>
          <router-link
            id="back"
            to="/home"
            class="btn btn-sm btn-primary float-right mr-2"
          >
            Kembali
          </router-link>
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
      vid: firebase.firestore().collection("video"),
      video: {
        nama: "",
        video_url: "",
      },

      videoData: null,
    };
  },

  methods: {
    onUpload(event) {
      this.videoData = event.target.files[0];
      console.log(this.videoData);
    },

    save() {
      var nama = document.getElementById("nama");
      if (nama.value == null || nama.value == "") {
        this.$swal({
          icon: "error",
          title: "Error!",
          text: "Nama Video tidak boleh kosong!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else if (this.videoData == null) {
        this.$swal({
          icon: "error",
          title: "Error!",
          text: "Video tidak boleh kosong!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        var save = document.getElementById("save");
        var back = document.getElementById("back");
        var back_load = document.getElementById("back_load");
        var loader = document.getElementById("loader");
        var video_file = document.getElementById("video");

        save.setAttribute("disabled", "disabled");
        nama.setAttribute("readonly", "readonly");
        video_file.setAttribute("readonly", "readonly");
        back.style.display = "none";
        back_load.style.display = "block";
        loader.style.display = "block";

        var storageRef = firebase
          .storage()
          .ref("video/" + "VID_" + Math.floor(10000 + Math.random() * 90000));
        storageRef.put(this.videoData).then((snapshot) => {
          snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log(this.video);
            this.video.video_url = downloadURL;
            this.vid
              .add(this.video)
              .then(() => {
                loader.style.display = "none";
                this.$swal({
                  icon: "success",
                  title: "Sukses",
                  text: "Video berhasil ditambahkan!",
                  showConfirmButton: false,
                  timer: 1500,
                });
                console.log(downloadURL);
              })
              .then(() => {
                window.setTimeout(() => {
                  router.push({
                    name: "home",
                  });
                }, 1500);
              });
          });
        });
      }
    },
  },
};
</script>