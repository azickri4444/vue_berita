<template>
  <div class="vue-template">
    <nav
      class="navbar bg-white rounded justify-content-between flex-nowrap flex-row"
    >
      <div class="container-fluid">
        <div class="navbar-brand float-left">
          <router-link to="/" style="text-decoration: none">
            <img src="@/assets/img/logo.png" width="120px" alt="" />
          </router-link>
        </div>
      </div>
    </nav>

    <div class="mt-5">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
document.title = "BeritaKita - Informasi Berita, Artikel, dan Video terupdate";
export default {
  //
};
</script>