<template>
  <div class="container" style="padding: 10px">
    <div class="card">
      <div class="card-body">
        <h5>Ubah Data Berita</h5>
        <hr />

        <div class="form-group">
          <label>Judul Berita</label>
          <input type="text" class="form-control" v-model="berita.judul" />
        </div>

        <div class="form-group">
          <label>Caption Berita</label>
          <input type="text" class="form-control" v-model="berita.caption" />
        </div>

        <div class="form-group">
          <label>Isi Berita</label>
          <Vueditor style="height: 500px" ref="editor"></Vueditor>
        </div>

        <div class="form-group">
          <label>Tanggal Berita</label>
          <input type="date" class="form-control" v-model="berita.tanggal" />
        </div>

        <div class="row">
          <div class="col-sm-3">
            <div class="text-center">Gambar berita saat ini</div>
            <center class="mt-2">
              <img v-bind:src="berita.url_image" width="150px" alt="" />
            </center>
          </div>
          <div class="col-sm-9">
            <div class="form-group">
              <label>Gambar Berita</label>
              <input
                type="file"
                class="form-control"
                accept="image/*"
                @change="image"
              />
              <div class="form-group mt-2">
                <button
                  class="btn btn-sm btn-success float-right"
                  @click="save"
                >
                  Simpan
                </button>
                <router-link
                  to="/home"
                  class="btn btn-primary float-right btn-sm mr-2"
                  >Kembali</router-link
                >
              </div>
            </div>
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

  beforeDestroy() {
    this.$refs.editor.setContent();
  },

  mounted() {
    const ref = firebase
      .firestore()
      .collection("berita")
      .doc(this.$route.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.key = doc.id;
        this.berita = doc.data();

        let editor_show = this.$refs.editor;
        editor_show.setContent(this.berita.isi);
      } else {
        alert("Berita tidak ditemukan!");
      }
    });
  },

  methods: {
    image(event) {
      this.imageData = event.target.files[0];
      console.log(this.imageData);
      // this.save();
    },
    save() {
      const updateRef = firebase
        .firestore()
        .collection("berita")
        .doc(this.$route.params.id);

      console.log(this.berita);
      if (this.imageData != null) {
        let image_old = firebase.storage().refFromURL(this.berita.url_image);
        console.log(image_old);
        image_old.delete().then(() => {
          console.log("Image terhapus!");
        });

        var storageRef = firebase
          .storage()
          .ref("berita/" + "BER_" + Math.floor(10000 + Math.random() * 90000));
        storageRef.put(this.imageData).then((snapshot) => {
          snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log(this.berita);
            let editor_update = this.$refs.editor;
            this.berita.isi = editor_update.getContent();

            this.berita.url_image = downloadURL;
            updateRef
              .set(this.berita)
              .then(() => {
                this.key = "";
                this.berita.judul;
                this.berita.caption;
                this.berita.isi;
                this.$swal({
                  icon: "success",
                  title: "Berita berhasil ditambahkan!",
                  showConfirmButton: false,
                  timer: 1500,
                });
                setTimeout(() => {
                  router.push({
                    name: "home",
                  });
                }, 1500);
              })
              .catch((error) => {
                alert("Error saat edit data, error: ", error);
              });
          });
        });
      } else {
        console.log(this.berita);
        let editor_update = this.$refs.editor;
        this.berita.isi = editor_update.getContent();

        updateRef
          .set(this.berita)
          .then(() => {
            this.key = "";
            this.berita.judul;
            this.berita.caption;
            this.berita.isi;
            this.$swal({
              icon: "success",
              title: "Sukses",
              text: "Berita berhasil disimpan!",
              showConfirmButton: false,
              timer: 1500,
            });
            window.setTimeout(() => {
              router.push({
                name: "home",
              });
            }, 1500);
          })
          .catch((error) => {
            this.$swal({
              icon: "error",
              title: "Error",
              text: "Berita gagal disimpan! error: " + error.message,
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    },
  },
};
</script>