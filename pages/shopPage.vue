<template>
  <div class="overflow-hidden">
    <v-app-bar
      class=""
      color="#EF3B36"
      absolute
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

        <v-col cols="3" class="d-flex justify-end align-center pst">
          <v-btn @click.stop="dialogBill = !dialogBill" color="red">
            <v-badge
              :content="cartData.length"
              :value="cartData.length"
              color="red"
              overlap
              class=""
            >
              <v-icon large> mdi-cart-outline </v-icon>
            </v-badge></v-btn
          >
        </v-col>
        <v-card width="350px" class="zindex" v-if="dialogBill ? true : false" rounded="xl" elevation="15">
          <v-card-title>
            <v-row>
              <v-col cols="3" class="body-2">รายการ</v-col>
              <v-col cols="3" class="body-2">จำนวน</v-col>
              <v-col cols="3" class="body-2">ราคา</v-col>
              <v-col cols="3" class="body-2">รวม</v-col>
            </v-row>
          </v-card-title>
          <v-card-text v-for="(item, index) in cartData" :key="index">
            <v-row>
              <v-col cols="3"> {{ item.NAME }} </v-col>
              <v-col cols="3"> {{ item.TOTAL }} </v-col>
              <v-col cols="3"> {{ item.PRICE }} </v-col>
              <v-col cols="3"> {{ item.SUMMARY }} </v-col>
            </v-row>
          </v-card-text>
          <v-card-text>
            <v-row>
              <v-col cols="3">ยอดรวม</v-col>
              <v-col cols="3"></v-col>
              <v-col cols="3"></v-col>
              <v-col cols="3">{{ totalSummary }}</v-col>
            </v-row>
          </v-card-text>
        </v-card>

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
                  md="6"
                  lg="3"
                  v-for="(item, index) in allProduct"
                  :key="index"
                >
                  <v-card rounded="xl" elevation="10" class="px-5">
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
                        <v-col
                          cols="7"
                          class="text-right"
                          v-if="item.PROMOTION === 1"
                        >
                          <h4>Promotion {{ item.PROMOTION_PRICE }} บาท</h4>
                        </v-col>
                        <v-col cols="7" class="" v-else> </v-col>
                        <v-col cols="6"><h4>จำนวน</h4></v-col>
                        <v-col cols="6" class="text-end"
                          ><h4 class="pr-3">{{ item.TOTAL }} แพค</h4></v-col
                        >

                        <v-col cols="12" class="pt-1">
                          <v-text-field
                            v-model="total[index]"
                            rounded
                            dense
                            type="number"
                            outlined
                            :min="0"
                            :rules="[
                              (v) =>
                                v <= item.TOTAL ||
                                'ใส่จำนวนสินค้าไม่เกินที่มีอยู่',
                            ]"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" class="text-center">
                          <v-btn rounded @click="addCart(item, index)" block>
                            <v-icon></v-icon>
                            เพิ่มลงตะกร้า
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
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
      dialogBill: false,
      drawer: null,
      items: [
        { title: 'หน้าหลัก', icon: 'mdi-home' },
        { title: 'โปรโมชั่น', icon: 'mdi-sale' },
        { title: 'ราคาหมูวันนี้', icon: 'mdi-shopping' },
        { title: 'สั่งซื้อ', icon: 'mdi-cart', link: '/shopPage' },
      ],
      headers: [
        {
          text: 'รายการ',
          value: 'NAME',
          align: 'left',
        },
        {
          text: 'จำนวน',
          value: 'TOTAL',
          align: 'left',
        },
        {
          text: 'ราคา',
          value: 'TOTAL',
          align: 'left',
        },
        {
          text: 'จำนวน x ราคา',
          value: 'SUMMARY',
          align: 'left',
        },
      ],
      messages: null,
      cartData: [],
      allProduct: [],
      total: [],
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

    addCart(item, index) {
      console.log(item)
      if (
        this.total[index] === null ||
        this.total[index] === undefined ||
        this.total[index] === ''
      ) {
        this.$swal({
          icon: 'warning',
          title: 'ใส่จำนวนสินค้า',
        })
      } else if (this.total[index] > item.TOTAL) {
        this.$swal({
          icon: 'warning',
          title: 'ใส่จำนวนสินค้าใหม่',
          text: 'จำนวนที่เลือกมากกว่าสินค้าที่มี',
        })
      } else if (item.PROMOTION === 1) {
        this.cartData.push({
          INDEX: index,
          NAME: item.NAME,
          DETAIL: item.DETAIL,
          PRICE: item.PROMOTION_PRICE,
          TOTAL: this.total[index],
          SUMMARY: item.PROMOTION_PRICE * this.total[index],
        })
      } else {
        this.cartData.push({
          INDEX: index,
          NAME: item.NAME,
          DETAIL: item.DETAIL,
          PRICE: item.PRICE,
          TOTAL: this.total[index],
          SUMMARY: item.PRICE * this.total[index],
        })
      }

      console.log(this.cartData)
      this.total[index] = null
    },
    openBill() {
      console.log(this.dialogBill)
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
    totalSummary() {
      // Loop through cartData and sum up item.SUMMARY values
      return this.cartData.reduce((total, item) => total + item.SUMMARY, 0)
    },
  },
}
</script>

<style scoped>
.text-color {
  text-align: center;
  color: white !important;
  font-weight: 700 !important;
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
  animation: gradient-animation 3s ease infinite;
}
@keyframes gradient-animation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
.pst {
  z-index: 10000 !important;
  position: relative !important;
}
.zindex {
  margin-right: 17px !important;
  top: 48% !important;
  right: 0 !important;
  position: absolute !important;
  z-index: 99999 !important;
}
</style>