<template>
  <div class="container" style="padding: 10px">
    <div class="card">
      <div class="card-body">
        <h5>Tambah Data Berita</h5>
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
          <input
            type="date"
            id="tanggal"
            class="form-control"
            v-model="berita.tanggal"
          />
        </div>

        <div class="form-group">
          <label>Gambar Berita</label>
          <input
            type="file"
            class="form-control"
            accept="image/*"
            @change="image"
          />
        </div>

        <div class="form-group">
          <button class="btn btn-sm btn-success float-right" @click="save">
            Simpan
          </button>

          <router-link
            class="btn btn-sm btn-primary float-right mr-2"
            to="/home"
            >Kembali</router-link
          >
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
      br: firebase.firestore().collection("berita"),
      berita: {
        judul: "",
        caption: "",
        isi: "",
        tanggal: new Date().toISOString().substr(0, 10),
        url_image: "",
      },
      imageData: null,
    };
  },

  methods: {
    image(event) {
      this.imageData = event.target.files[0];
      console.log(this.imageData);
      // this.save();
    },

    beforeDestroy() {
      this.$refs.editor.setContent();
    },

    save() {
      console.log(this.berita);

      var storageRef = firebase
        .storage()
        .ref("berita/" + "BER_" + Math.floor(10000 + Math.random() * 90000));
      storageRef.put(this.imageData).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log(this.berita);
          let editor = this.$refs.editor;
          this.berita.isi = editor.getContent();
          this.berita.url_image = downloadURL;
          this.br.add(this.berita).then(() => {
            console.log(downloadURL);
            this.$swal({
              icon: "success",
              title: "Sukses",
              text: "Berita berhasil ditambahkan!",
              showConfirmButton: false,
              timer: 1500,
            });
            window.setTimeout(() => {
              router.push({
                name: "home",
              });
            }, 1500);
          });
        });
      });
    },
  },
};
</script>