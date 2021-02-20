<template>
  <div class="container-fluid">
    <h4>SEMUA ARTIKEL</h4>
    <hr />

    <div class="row">
      <div class="col-sm-6" v-for="artikel in artikels" :key="artikel.key">
        <div class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">{{ artikel.judul }}</h5>
            <p style="font-size: 12px">{{ artikel.caption }}</p>
            <hr />
            <p class="card-text">
              <small class="text-muted float-right">{{
                artikel.tanggal
              }}</small>
            </p>

            <span
              class="text-primary"
              style="text-decoration: none; font-size: 14px; cursor: pointer"
              @click.stop="showArtikel(artikel.key)"
              >Baca Selengkapnya</span
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
      artikels: [],
      art: firebase.firestore().collection("artikel"),
    };
  },

  created() {
    this.art.onSnapshot((querySnapshot) => {
      this.artikels = [];
      querySnapshot.forEach((br) => {
        this.artikels.push({
          key: br.id,
          judul: br.data().judul,
          isi: br.data().isi,
          tanggal: br.data().tanggal,
          caption: br.data().caption,
        });
      });
    });
  },

  methods: {
    showArtikel(artikels) {
      console.log(artikels);
      router.push({
        name: "guest-baca-artikel",
        params: {
          id: artikels,
        },
      });
    },
  },
};
</script>