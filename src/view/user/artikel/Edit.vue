<template>
  <div class="container" style="padding: 10px">
    <div class="card">
      <div class="card-body">
        <h5>Tambah Data Artikel</h5>
        <hr />

        <div class="form-group">
          <label>Judul Artikel</label>
          <input type="text" class="form-control" v-model="artikel.judul" />
        </div>

        <div class="form-group">
          <label>Caption Artikel</label>
          <input type="text" class="form-control" v-model="artikel.caption" />
        </div>

        <div class="form-group">
          <label>Tanggal Artikel</label>
          <input type="date" class="form-control" v-model="artikel.tanggal" />
        </div>

        <div class="form-group">
          <label>Isi Artikel</label>
          <Vueditor style="height: 500px" ref="editor"></Vueditor>
        </div>

        <div class="form-group">
          <button class="btn btn-sm btn-success float-right" @click="save">
            Simpan
          </button>
          <router-link
            to="/home"
            class="btn btn-sm btn-primary float-right mr-2"
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
      key: this.$route.params.id,
      artikel: {
        judul: "",
        tanggal: "",
        isi: "",
      },
    };
  },

  beforeDestroy() {
    this.$refs.editor.setContent("");
  },

  mounted() {
    const ref = firebase
      .firestore()
      .collection("artikel")
      .doc(this.$route.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.key = doc.id;
        this.artikel = doc.data();
        // this.$nextTick(() => {
        // });
        let editor_show = this.$refs.editor;
        editor_show.setContent(this.artikel.isi);
      } else {
        alert("Artikel tidak ditemukan!");
      }
    });
  },

  methods: {
    save() {
      const updateRef = firebase
        .firestore()
        .collection("artikel")
        .doc(this.$route.params.id);

      console.log(this.artikel);
      let editor_update = this.$refs.editor;
      this.artikel.isi = editor_update.getContent();

      updateRef
        .set(this.artikel)
        .then(() => {
          this.key = "";
          this.artikel.judul;
          this.artikel.caption;
          this.artikel.tanggal;
          this.artikel.isi;
          console.log(this.artikel);
          this.$swal({
            icon: "success",
            title: "Sukses",
            text: "Artikel berhasil disimpan!",
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
            text: "Artikel gagal disimpan! error: " + error.message,
            showConfirmButton: false,
            timer: 1500,
          });
        });
    },
  },
};
</script>