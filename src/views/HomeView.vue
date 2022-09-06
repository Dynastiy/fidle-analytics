<template>
  <div>
    <div class="p-3" style="background-color: var(--blue-200)">
      <h3 class="text-white text-center">Fidle User analytics</h3>
    </div>
    <div class="container">
      <div class="mt-4">
        <h3>View Users by Countries</h3>
        <div class="search--input mt-4">
          <input type="text" placeholder="Search country" v-model="search" />
        </div>
        <div class="cards--listing my-4">
          <div
            class="bg-white shadow-lg p-3"
            v-for="item in displayedAnalytics"
            :key="item.id"
          >
            <h6 class="mb-2">{{ item.name }}</h6>
            <h4>{{ item.total }}</h4>
          </div>
        </div>
        <AppPagination :meta="meta" @next="next" @prev="prev" />
      </div>

      <div class="mt-5">
        <h3 class="mt-5">View Users by Age</h3>
        <div class="">
          <div id="chart"></div>
        </div>
        <div class="cards--listing my-3">
          <div class="bg-white shadow-lg p-3" v-for="item in age" :key="item.id">
            <!-- <h6> 0 - 18 </h6> -->
            <h6>{{ item[0].replace('_', " - ") }}</h6>
            <h4>{{ item[1] }}</h4>
          </div>
        </div>
      </div>

      <div class="mt-5">
        <h3>View Users by Gender</h3>
        <div id="chart2"></div>
        <div class="cards--listing my-3">
          <div class="bg-white shadow-lg p-3" v-for="item in gender" :key="item.id">
            <h6 class="text-capitalize">{{ item[0].replace('_', " ") }}</h6>
            <h4>{{ item[1] }}</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import ApexCharts from 'apexcharts'
import AppPagination from "../components/appPagination.vue";
export default {
  data() {
    return {
      meta: {
        perPage: 20,
        page: 1,
        pages: [],
      },
      search: null,
    };
  },
  methods: {
    setPages() {
      let numberOfPages = Math.ceil(this.countries.length / this.meta.perPage);
      console.log(numberOfPages);
      for (let index = 1; index <= numberOfPages; index++) {
        this.meta.pages.push(index);
      }
    },
    prev() {
      this.meta.page--;
    },
    next() {
      this.meta.page++;
    },
    paginate() {
      let page = this.meta.page;
      let perPage = this.meta.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return this.countries.slice(from, to);
    },
  },
  beforeMount() {
    this.$store.dispatch("getAnalytics");
  },
  watch: {
    countries() {
      this.setPages();
    },
  },
  mounted(){

    // Chart for View by Ages 
    var keys = {}
    Object.keys(this.age[0]).forEach((key) => {
        keys["ss" + key] = this.age.map((obj) => obj[key]);
    });
    console.log(keys)
  
    var options = {
          series: keys.ss1,
          chart: {
          width: 350,
          type: 'pie',
        },
        labels: keys.ss0,
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 350
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
        };

        var chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();



        // Chart for View by Gender
    var gender_keys = {}
    Object.keys(this.gender[0]).forEach((key) => {
      gender_keys["ss" + key] = this.gender.map((obj) => obj[key]);
    });
    console.log(gender_keys)
  
    var options2 = {
          series: gender_keys.ss1,
          chart: {
          width: 350,
          type: 'pie',
        },
        labels: gender_keys.ss0,
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 350
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
        };

        var chart2 = new ApexCharts(document.querySelector("#chart2"), options2);
        chart2.render();
  },
  computed: {
    analytics() {
      return this.$store.getters["getAnalytics"];
    },
    countries() {
      return this.$store.getters["getAnalytics"].by_countries;
    },
    age() {
      return Object.entries(this.$store.getters["getAnalytics"].by_age_range);
    },

    gender() {
      return Object.entries(this.$store.getters["getAnalytics"].by_gender);
    },
    displayedAnalytics() {
      var countries = this.$store.getters["getAnalytics"].by_countries;
      if (this.search) {
        return countries.filter((item) => {
          return this.search
            .toLowerCase()
            .split(" ")
            .every((v) => item.name.toLowerCase().includes(v));
        });
      } else {
        return this.paginate(this.countries);
      }
    },
  },
  components: { AppPagination },
};
</script>
