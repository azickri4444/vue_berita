<template>
  <div class="container-fluid">
    <h4>SEMUA BERITA</h4>
    <hr />

    <div class="row">
      <div class="col-sm-6 mb-3" v-for="berita in beritas" :key="berita.key">
        <div class="card" style="widht: 100%">
          <img
            class="card-img-top"
            v-bind:src="berita.url_image"
            alt="Card image cap"
            style="height: 15rem"
          />
          <div class="card-body">
            <h5
              class="card-title"
              style="
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              "
            >
              {{ berita.judul }}
            </h5>
            <p class="card-text" style="font-size: 10px">
              {{ berita.caption }}
            </p>
            <div class="float-right" style="font-size: 10px">
              {{ berita.tanggal }}
            </div>
            <div class="mt-5">
              <hr />
              <button
                class="btn btn-sm btn-primary float-right"
                @click="showBerita(berita.key)"
              >
                Baca selengkapnya
              </button>
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
      beritas: [],
      br: firebase.firestore().collection("berita"),
    };
  },

  methods: {
    showBerita(beritas) {
      console.log(beritas);
      router.push({
        name: "guest-baca-berita",
        params: {
          id: beritas,
        },
      });
    },
  },

  created() {
    this.br.onSnapshot((querySnapshot) => {
      this.beritas = [];
      querySnapshot.forEach((br) => {
        this.beritas.push({
          key: br.id,
          judul: br.data().judul,
          caption: br.data().caption,
          isi: br.data().isi,
          tanggal: br.data().tanggal,
          url_image: br.data().url_image,
        });
      });
    });
  },
};
</script>