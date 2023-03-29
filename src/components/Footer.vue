<template>
  <div class="footer bg-slate-500">
    <div class="py-4 relative px-4 py-4 flex flex-col lg:flex-row justify-between items-center">
      <router-link
        class="flex items-center"
        to="/"><img src="https://www.adoorei.com.br/wp-content/uploads/2022/03/LOGO-ADOREI.svg" class="h-6 mr-3 sm:h-9" alt="Adoorei Logo" />
      </router-link>
      <div class="flex items-center mt-5 lg:mt-0">
        <a href="#" class="py-2 px-3 lg:px-4 text-white inline-block hover:none">Termos de Serviço</a>
        <a href="#" class="py-2 px-3 lg:px-4 text-white inline-block hover:none">Política de Privacidade</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FooterNavigation"
};
</script>