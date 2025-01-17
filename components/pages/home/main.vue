<script lang="ts" setup>
import HeroSection from "~/components/pages/home/hero.vue";
import moreDetails from "~/components/pages/home/more-details.vue";
import PowerAndInnovation from "~/components/pages/home/PowerAndInnovation.vue";
import primeServices from "~/components/shared/website/prime-services.vue";
import discoverEnergy from "~/components/pages/home/discover-energy.vue";
import porwerFullSource from "~/components/pages/home/power-ful-source.vue";
import readyToConnect from "~/components/shared/website/ready-to-connect.vue";
import OurPartners from "~/components/shared/website/our-partners.vue";
import newsArticles from "~/components/pages/home/news-articles.vue";
import whatClientSay from "~/components/pages/home/what-clients-say.vue";
import ContactForQuote from "~/components/shared/website/contact-for-quote.vue";
import Products from "~/components/shared/website/products.vue";
import Certificates from "./Certificates.vue";
//  home-page ---interface ��
import type { IHomePage } from "~/types";
import { useCommonStore } from "~/stores/common";
//  Props 🔥
const { pageData } = defineProps<IHomePage>();
const common = useCommonStore();
// set-footer-data 🦶
common.setState(pageData.data.landing.footer_section);
</script>
<template>
  <div>
    <HeroSection :data="pageData.data.landing.hero_section" />
    <more-details />
    <PowerAndInnovation :data="pageData.data.landing.first_section" />
    <primeServices
      numb_sections="02"
      :services="pageData.data.services"
      :data="pageData.data.landing.second_section"
    />
    <discover-energy
      :categories="pageData.data.categories"
      :data="pageData.data.landing.third_section"
    />
    <porwerFullSource :data="pageData.data.landing.fourth_section" />
    <Products
      :num_section="'05'"
      :products="pageData.data.products"
      :data="pageData.data.landing.fifth_section"
    />
    <ready-to-connect :data="pageData.data.landing.card_section" />
    <whatClientSay
      :clientReviews="pageData.data.clientReviews"
      :data="pageData.data.landing.sixth_section"
    />
    <Certificates
      :certificates="pageData.data.certificates"
      :data="pageData.data.landing.seventh_section"
    />
    <Products
      num_section="08"
      :products="pageData.data.newestProducts"
      :with_slash="true"
      :data="pageData.data.landing.eighth_section"
    />
    <our-partners
      num_section="09"
      :partners="pageData.data.partners"
      :data="pageData.data.landing.ninth_section"
    />
    <ContactForQuote :data="pageData.data.landing.contact_section" />
    <newsArticles
      :blogs="pageData.data.blogs"
      :data="pageData.data.landing.tenth_section"
    />
  </div>
</template>
