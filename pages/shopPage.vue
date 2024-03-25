<template>
  <div class="overflow-hidden">
    <v-app-bar
      class=""
      color="#EF3B36"
      absolute
      dark
      shrink-on-scroll
      :min-height="82"
      :src="require('~/assets/storepork.jpg')"
      scroll-target="#scrolling-techniques-2"
    >
      <template v-slot:img="{ props }">
        <v-img
          :min-height="82"
          v-bind="props"
          gradient="to top right, rgba(239, 59, 54,.5), rgba(250,250,250,.8)"
        ></v-img>
      </template>

      <v-row no-gutter>
        <v-col cols="6" md="2" lg="2" class="pl-0">
          <v-toolbar-title class="pa-0">
            <v-img
              class="mt-1"
              :src="require('~/assets/logo.png')"
              height="70px"
              width="150px"
            /> </v-toolbar-title
        ></v-col>

        <v-spacer></v-spacer>

        <v-col cols="3" class="d-flex justify-end align-center">
          <v-badge
            :content="messages"
            :value="messages"
            color="red"
            overlap
            class="mr-5"
          >
            <v-icon large> mdi-cart-outline </v-icon>
          </v-badge>
        </v-col>

        <v-col
          cols="3"
          lg="2"
          class="d-flex d-md-none d-lg-none justify-end align-center"
        >
          <v-app-bar-nav-icon
            dark
            v-if="smallScreen"
            @click.stop="drawer = !drawer"
          ></v-app-bar-nav-icon>
        </v-col>
      </v-row>
    </v-app-bar>
    <v-sheet
      id="scrolling-techniques-2"
      class="overflow-y-auto bg"
      height="100dvh"
    >
      <div style="height: auto">
        <v-container fluid class="mt-15">
          <v-row class="">
            <v-col cols="4" class="mt-15 pb-0">
              <v-btn @click="gotoHome">กลับสู่หน้าหลัก </v-btn>
            </v-col>
            <v-col cols="4" class="mt-15 pb-0 text-center">
              <h1 class="text-color">รายการสินค้า</h1>
            </v-col>
            <v-col cols="4" class="mt-15 pb-0"> </v-col>

            <v-col cols="12">
              <v-row>
                <v-col
                  cols="12"
                  md="3"
                  lg="3"
                  v-for="(item, index) in allProduct"
                  :key="index"
                >
                  <v-hover v-slot="{ hover }">
                    <v-card
                      rounded="xl"
                      elevation="10"
                      class="px-5"
                      :class="{ 'on-hover': hover }"
                    >
                      <v-card-title class="justify-center">
                        {{ item.NAME }}
                      </v-card-title>
                      <v-card-text class="pa-2">
                        <v-row>
                          <v-col cols="12" class="">
                            <v-img
                              :src="item.FILELINK"
                              width="200px"
                              height="100px"
                              class="mx-auto rounded-xl"
                            />
                          </v-col>
                          <v-col cols="5" class="" v-if="item.PROMOTION === 0">
                            <h4>ราคา {{ item.PRICE }} บาท</h4>
                          </v-col>
                          <v-col cols="5" class="" v-else>
                            <h4 class="text-line">ราคา {{ item.PRICE }} บาท</h4>
                          </v-col>
                          <v-col cols="7" class="" v-if="item.PROMOTION === 1">
                            <h4>Promotion {{ item.PROMOTION_PRICE }} บาท</h4>
                          </v-col>
                          <v-col cols="7" class="" v-else> </v-col>
                          <v-col cols="6"><h4>จำนวน</h4></v-col>
                          <v-col cols="6" class="text-end"
                            ><h4 class="pr-3">{{ item.TOTAL }} แพค</h4></v-col
                          >
                          <v-card-actions>
                            <v-row no-gutters class="mb-5">
                              <v-col
                                cols="4"
                                class="d-flex justify-center align-center"
                              >
                                <v-btn rounded>
                                  <v-icon @click="minusTotal">mdi-minus</v-icon>
                                </v-btn>
                              </v-col>
                              <v-col cols="4" class="pt-1">
                                <v-text-field
                                  v-model="total[index]"
                                  rounded
                                  dense
                                  type="number"
                                  outlined
                                  hide-details
                                ></v-text-field>
                              </v-col>
                              <v-col
                                cols="4"
                                class="d-flex justify-center align-center"
                              >
                                <v-btn rounded>
                                  <v-icon @click="plusTotal(index)"
                                    >mdi-plus</v-icon
                                  >
                                </v-btn>
                              </v-col>
                            </v-row>
                          </v-card-actions>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </v-hover>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-sheet>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list-item>
        <v-list-item-avatar>
          <v-img :src="require('~/assets/logo.png')"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Tiney Pork Shop</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.link"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      transparent: 'rgba(255, 255, 255, 0)',
      drawer: null,
      items: [
        { title: 'หน้าหลัก', icon: 'mdi-home' },
        { title: 'โปรโมชั่น', icon: 'mdi-sale' },
        { title: 'ราคาหมูวันนี้', icon: 'mdi-shopping' },
        { title: 'สั่งซื้อ', icon: 'mdi-cart', link: '/shopPage' },
      ],
      messages: null,
      cartData: [],
      allProduct: [],
      total: []
    }
  },
  created() {
    this.callAllProduct()
  },
  methods: {
    ...mapActions({
      listProduct: 'users/listProduct',
    }),
    goShopPage() {
      this.$router.push({ path: '/shopPage' })
    },
    goLogin() {
      this.$router.push({ path: '/loginPage' })
    },
    gotoHome() {
      this.$router.push({ path: '/' })
    },
    async callAllProduct() {
      this.allProduct = await this.listProduct()
      console.log(this.allProduct)
    },
    minusTotal() {
      if (this.total > 0) {
        this.total -= 1
      }
    },
    plusTotal(index) {
      // Increment the value by 1
      this.total[index]++
      console.log(this.total)
    },
  },
  computed: {
    smallScreen() {
      return this.$vuetify.breakpoint.mdAndDown
    },
    textSize() {
      let fonSize = 0
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          fonSize = 20
          break
        case 'sm':
          fonSize = 30
          break
        case 'md':
          fonSize = 40
          break
        case 'lg':
          fonSize = 60
          break
        case 'xl':
          padding = 60
          break
      }
      return `${fonSize}px`
    },
  },
}
</script>

<style scoped>
.bg {
  background-color: aquamarine;
}
.v-card {
  transition: opacity 0.2s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.9;
}

.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}
.text-color {
  text-align: center;
  color: white !important;
  font-weight: 700 !important;
}
.bg-hover:hover {
  height: 55px !important;
  /* width: 150px !important; */
  background-color: rgb(83, 83, 83, 0.7);
  transition-duration: 1s !important;
  border-radius: 20px !important;
}
.carousel-text {
  position: absolute;
  top: 60%;
  left: 35%;
  transform: translate(-50%, -50%);
  color: white; /* Adjust text color as needed */
  z-index: 100; /* Ensure text appears above the image */
  font-size: 30px;
}
.text-line {
  text-decoration: line-through;
}
.bg {
  background: linear-gradient(111deg, #200122, #6f0000);
  background-size: 120% 120%;
}
</style>