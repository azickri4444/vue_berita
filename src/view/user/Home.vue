<template>
  <div class="container" style="padding: 10px">
    <div class="alert alert-primary">
      Selamat datang, <b> {{ user.displayName }}</b>
      <font-awesome-icon class="float-right" size="lg" icon="info-circle" />
    </div>
    <div class="row">
      <div class="col-sm-8 mb-2">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-4">
                <div class="card-counter primary">
                  <font-awesome-icon
                    size="4x"
                    style="opacity: 0.2"
                    icon="book-reader"
                  />
                  <span class="count-numbers">{{ beritas.length }}</span>
                  <span class="count-name">Data Berita</span>
                </div>
              </div>

              <div class="col-md-4">
                <div class="card-counter danger">
                  <font-awesome-icon
                    size="4x"
                    style="opacity: 0.2"
                    icon="book-open"
                  />
                  <span class="count-numbers">{{ artikels.length }}</span>
                  <span class="count-name">Artikel</span>
                </div>
              </div>

              <div class="col-md-4">
                <div class="card-counter success">
                  <font-awesome-icon
                    size="4x"
                    style="opacity: 0.2"
                    icon="video"
                  />
                  <span class="count-numbers">{{ videos.length }}</span>
                  <span class="count-name">Video</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-sm-4">
        <div class="card">
          <div class="card-header">Navigasi</div>
          <div class="card-body">
            <button
              type="submit"
              class="btn btn-primary btn-block"
              @click="logOut()"
            >
              Keluar
            </button>
          </div>
        </div>
      </div>

      <div class="col-12 mt-3">
        <div class="card">
          <div class="card-body">
            <h4>
              Data Berita
              <router-link
                to="/create/berita"
                class="float-right btn btn-primary btn-sm"
                style="font-size: 15px"
                >Tambah Data</router-link
              >
            </h4>
            <hr />
            <div class="row">
              <div class="col-sm-12" v-if="beritas.length == 0">
                <div class="alert alert-primary" role="alert">
                  Tidak ada berita untuk ditampilkan!
                </div>
              </div>
              <div
                v-else
                class="col-sm-4 mb-3"
                v-for="berita in beritas"
                :key="berita.key"
              >
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
                        class="btn btn-warning btn-sm"
                        @click.stop="show_berita(berita.key)"
                      >
                        Baca
                      </button>
                      <div class="btn-group float-right">
                        <button
                          class="btn btn-primary btn-sm"
                          @click.stop="edit_berita(berita.key)"
                        >
                          Edit
                        </button>
                        <button
                          class="btn btn-danger btn-sm"
                          @click.stop="destroy_berita(berita)"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-sm-5 mt-3">
        <div class="card">
          <div class="card-body">
            <h4>
              Data Video
              <router-link
                to="/create/video"
                class="float-right btn btn-primary btn-sm"
                style="font-size: 15px"
                >Tambah Data</router-link
              >
            </h4>
            <hr />

            <div class="row">
              <div class="col-sm-12" v-if="videos.length == 0">
                <div class="alert alert-primary" role="alert">
                  Tidak ada video untuk ditampilkan!
                </div>
              </div>
              <div
                v-else
                class="col-sm-12 mb-3"
                v-for="video in videos"
                :key="video.key"
              >
                <div class="card" style="width: 100%">
                  <div class="card-body">
                    <video
                      width="100%"
                      height="100%"
                      controls
                      v-bind:src="video.video_url"
                    ></video>
                    <span style="font-size: 12px">{{ video.nama }}</span>
                    <br />
                    <hr />

                    <button
                      class="btn btn-sm btn-warning"
                      @click.stop="show_video(video.key)"
                    >
                      Nonton
                    </button>
                    <div class="btn-group float-right">
                      <button
                        class="btn btn-sm btn-primary"
                        @click.stop="edit_video(video.key)"
                      >
                        Edit
                      </button>
                      <button
                        class="btn btn-sm btn-danger"
                        @click="destroy_video(video)"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-sm-7 mt-3">
        <div class="card">
          <div class="card-body">
            <h4>
              Data Artikel
              <router-link
                to="/create/artikel"
                class="float-right btn btn-primary btn-sm"
                style="font-size: 15px"
                >Tambah Data</router-link
              >
            </h4>
            <div v-if="artikels.length == 0">
              <hr />
              <div class="alert alert-primary" role="alert">
                Tidak ada berita untuk ditampilkan!
              </div>
            </div>
            <div v-else class="table-responsive">
              <br />
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>Judul</th>
                    <th style="width: 150px">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="artikel in artikels" :key="artikel.key">
                    <td
                      class="text-primary"
                      style="cursor: pointer"
                      @click.stop="show_artikel(artikel.key)"
                    >
                      {{ artikel.judul }}
                    </td>
                    <td>
                      <div class="btn-group">
                        <button
                          class="btn btn-sm btn-primary"
                          @click.stop="edit_artikel(artikel.key)"
                        >
                          Edit
                        </button>
                        <button
                          class="btn btn-sm btn-danger"
                          @click.stop="destroy_artikel(artikel)"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import router from "../../router";
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
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      }
    });

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

    this.art.onSnapshot((querySnapshot) => {
      this.artikels = [];
      querySnapshot.forEach((br) => {
        this.artikels.push({
          key: br.id,
          judul: br.data().judul,
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
    logOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          firebase.auth().onAuthStateChanged(() => {
            this.$router.push("/login");
          });
        });
    },

    // Berita
    edit_berita(beritas) {
      console.log(beritas);
      router.push({
        name: "edit-berita",
        params: {
          id: beritas,
        },
      });
    },
    show_berita(beritas) {
      console.log(beritas);
      router.push({
        name: "show-berita",
        params: {
          id: beritas,
        },
      });
    },
    destroy_berita(beritas) {
      this.$swal({
        title: "Anda yakin?",
        text: "Berita ini akan terhapus!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6 ",
        confirmButtonText: "Yakin",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          let image = firebase.storage().refFromURL(beritas.url_image);
          console.log(image);
          image.delete().then(() => {
            console.log("Gambar terhapus!");
          });

          firebase
            .firestore()
            .collection("berita")
            .doc(beritas.key)
            .delete()
            .then(() => {
              this.$swal({
                icon: "success",
                title: "Sukses",
                text: "Berita berhasil dihapus!",
                showConfirmButton: false,
                timer: 1500,
              });
            })
            .catch((error) => {
              this.$swal({
                icon: "error",
                title: "Error",
                text: "Berita gagal dihapus! error: " + error.message,
                showConfirmButton: false,
                timer: 1500,
              });
            });
        }
      });
    },

    // Artikel
    edit_artikel(artikels) {
      console.log(artikels);
      router.push({
        name: "edit-artikel",
        params: {
          id: artikels,
        },
      });
    },
    show_artikel(artikels) {
      console.log(artikels);
      router.push({
        name: "show-artikel",
        params: {
          id: artikels,
        },
      });
    },
    destroy_artikel(artikels) {
      this.$swal({
        title: "Anda yakin?",
        text: "Artikel ini akan terhapus!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yakin",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          firebase
            .firestore()
            .collection("artikel")
            .doc(artikels.key)
            .delete()
            .then(() => {
              this.$swal({
                icon: "success",
                title: "Sukses",
                text: "Artikel berhasil dihapus!",
                showConfirmButton: false,
                timer: 1500,
              });
            })
            .catch((error) => {
              this.$swal({
                icon: "success",
                title: "Sukses",
                text: "Artikel gagal dihapus! error: " + error.message,
                showConfirmButton: false,
                timer: 1500,
              });
            });
        }
      });
    },

    // Video
    edit_video(videos) {
      console.log(videos);
      router.push({
        name: "edit-video",
        params: {
          id: videos,
        },
      });
    },
    show_video(videos) {
      console.log(videos);
      router.push({
        name: "show-video",
        params: {
          id: videos,
        },
      });
    },
    destroy_video(videos) {
      this.$swal({
        title: "Anda yakin?",
        text: "Video ini akan terhapus!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6 ",
        confirmButtonText: "Yakin",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          let video = firebase.storage().refFromURL(videos.video_url);
          console.log(video);
          video.delete().then(() => {
            console.log("Video terhapus!");
          });

          firebase
            .firestore()
            .collection("video")
            .doc(videos.key)
            .delete()
            .then(() => {
              this.$swal({
                icon: "success",
                title: "Sukses",
                text: "Video berhasil dihapus!",
                showConfirmButton: false,
                timer: 1500,
              });
            })
            .catch((error) => {
              this.$swal({
                icon: "success",
                title: "Sukses",
                text: "Video gagal dihapus! error: " + error.message,
                showConfirmButton: false,
                timer: 1500,
              });
            });
        }
      });
    },
  },
};
</script>

<style>
.card-counter {
  box-shadow: 2px 2px 10px #dadada;
  margin: 5px;
  padding: 20px 10px;
  background-color: #fff;
  height: 100px;
  border-radius: 5px;
  transition: 0.3s linear all;
}

.card-counter:hover {
  box-shadow: 4px 4px 20px #dadada;
  transition: 0.3s linear all;
}

.card-counter.primary {
  background-color: #007bff;
  color: #fff;
}

.card-counter.danger {
  background-color: #ef5350;
  color: #fff;
}

.card-counter.success {
  background-color: #66bb6a;
  color: #fff;
}

.card-counter.info {
  background-color: #26c6da;
  color: #fff;
}

.card-counter .count-numbers {
  position: absolute;
  right: 35px;
  top: 20px;
  font-size: 32px;
  display: block;
}

.card-counter .count-name {
  position: absolute;
  right: 35px;
  top: 65px;
  font-style: italic;
  text-transform: capitalize;
  opacity: 0.5;
  display: block;
  font-size: 18px;
}
</style>