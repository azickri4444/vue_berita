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
      art: firebase.firestore().collection("artikel"),
      artikel: {
        judul: "",
        isi: "",
        caption: "",
        tanggal: new Date().toISOString().substr(0, 10),
      },
    };
  },

  beforeDestroy() {
    this.$refs.editor.setContent();
  },

  methods: {
    save() {
      let editor = this.$refs.editor;
      this.artikel.isi = editor.getContent();
      this.art.add(this.artikel).then(() => {
        console.log(this.artikel);
        this.$swal({
          icon: "success",
          title: "Sukses",
          text: "Artikel berhasil ditambahkan!",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          router.push({
            name: "home",
          });
        }, 1500);
      });
    },
  },
};
</script>