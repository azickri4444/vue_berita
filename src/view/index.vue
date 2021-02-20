<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-8">
        <h4>BERITA TERBARU</h4>
        <div class="card mb-3" v-for="berita in beritas" :key="berita.key">
          <img v-bind:src="berita.url_image" class="card-img-top" alt="" />
          <div class="card-body">
            <h5 class="card-title">{{ berita.judul }}</h5>
            <p class="card-text" style="font-size: 12px">
              <span class="badge badge-primary">{{ berita.tag }}</span>
            </p>
            <p class="card-text">
              <span
                class="text-primary"
                style="font-size: 14px; cursor: pointer"
                @click="showBerita(berita.key)"
              >
                Baca selengkapnya
              </span>
              <small class="text-muted float-right">{{ berita.tanggal }}</small>
            </p>
          </div>
        </div>
      </div>

      <div class="col-sm-4 mt-3">
        <h4>ARTIKEL TERBARU</h4>
        <div class="card mb-2" v-for="artikel in artikels" :key="artikel.key">
          <div class="card-body">
            <h5
              class="card-title"
              style="
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              "
            >
              {{ artikel.judul }}
            </h5>
            <h6 class="card-subtitle mb-2 text-muted">{{ artikel.tanggal }}</h6>
            <hr />
            <p style="font-size: 12px">{{ artikel.caption }}</p>
            <span
              @click.stop="showArtikel(artikel.key)"
              class="text-primary text-center"
              style="font-size: 14px; cursor: pointer"
              >Baca selengkapnya</span
            >
          </div>
        </div>

        <br />

        <h4>VIDEO TERBARU</h4>
        <div class="card mb-3" v-for="video in videos" :key="video.key">
          <div class="card-body">
            <video
              v-bind:src="video.video_url"
              width="100%"
              height="100%"
              controls
            ></video>
            <p class="card-text" style="font-size: 12px">
              <span class="badge badge-primary">{{ video.nama }}</span>
            </p>
            <p class="card-text">
              <span
                class="text-primary"
                style="cursor: pointer; font-size: 14px"
                @click="showVideo(video.key)"
              >
                Tonton Full Layar
              </span>
            </p>
          </div>
        </div>
      </div>

      <div style="background-color: #fff; width: 100%" class="mt-2">
        <div class="container-fluid mt-3">
          <div class="row mb-4">
            <div class="col-sm-8">
              <div class="footer-text pull-left">
                <div class="d-flex">
                  <h1
                    class="font-weight-bold px-2"
                    style="color: #16151a; background-color: #957bda"
                  >
                    B
                  </h1>
                  <h1 style="color: #957bda">eritaKita</h1>
                </div>
                <p class="card-text mt-4">
                  BeritaKita adalah portal berita, artikel, dan video terkini.
                  Informasi terbaru dan akurat yang disajikan BeritaKita sudah
                  terpercaya.
                </p>
              </div>
            </div>
            <div class="col-sm-2 mt-3">
              <h5 class="heading">Menu</h5>
              <ul>
                <li>
                  <router-link style="text-decoration: none" to="/berita"
                    >Berita</router-link
                  >
                </li>
                <li>
                  <router-link style="text-decoration: none" to="/artikel"
                    >Artikel</router-link
                  >
                </li>
                <li>
                  <router-link style="text-decoration: none" to="/video"
                    >Video</router-link
                  >
                </li>
              </ul>
            </div>
            <div class="col-sm-2 mt-3">
              <h5 class="heading">Pengelola</h5>
              <ul class="card-text">
                <li>
                  <router-link style="text-decoration: none" to="/login"
                    >Masuk</router-link
                  >
                </li>
              </ul>
            </div>
          </div>
          <div class="row" style="font-size: 10px">
            <div class="col-md-12 col-sm-12">
              <div class="text-center">
                <p>2021 BeritaKita</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

ul li router-link {
  padding: 4px;
  color: #444;
}

ul > li > router-link:hover {
  color: #957bda;
  cursor: pointer;
}

hr {
  border-width: 3px;
}

.social > i {
  padding: 1%;
  font-size: 15px;
}

.social > i:hover {
  color: #957bda;
  cursor: pointer;
}

.policy > div {
  padding: 4px;
}

.heading {
  font-family: "Titillium Web", sans-serif;
}

.divider {
  border-top: 2px solid rgba(189, 196, 203, 0.5);
}
</style>

<script>
import firebase from "firebase";
import router from "../router";

export default {
  data() {
    return {
      user: {},

      beritas: [],
      br: firebase.firestore().collection("berita"),

      artikels: [],
      art: firebase.firestore().collection("artikel"),

      videos: [],
      vid: firebase.firestore().collection("video"),
    };
  },

  created() {
    this.br.onSnapshot((querySnapshot) => {
      this.beritas = [];
      querySnapshot.forEach((br) => {
        this.beritas.push({
          key: br.id,
          judul: br.data().judul,
          tag: br.data().tag,
          caption: br.data().caption,
          isi: br.data().isi,
          tanggal: br.data().tanggal,
          url_image: br.data().url_image,
        });
      });
    });

    this.art.onSnapshot((querySnapshot) => {
      this.artikels = [];
      querySnapshot.forEach((br) => {
        this.artikels.push({
          key: br.id,
          judul: br.data().judul,
          caption: br.data().caption,
          isi: br.data().isi,
        });
      });
    });

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
    showBerita(beritas) {
      console.log(beritas);
      router.push({
        name: "guest-baca-berita",
        params: {
          id: beritas,
        },
      });
    },

    showVideo(videos) {
      console.log(videos);
      router.push({
        name: "guest-nonton-video",
        params: {
          id: videos,
        },
      });
    },

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