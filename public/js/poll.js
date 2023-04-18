$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: "https://open.canada.ca/data/api/action/package_show?id=0bfdacb3-12fd-40e7-820b-87f269e9f191",
        dataType: "JSON",
        success: function(response){
            let article = response.result;
            console.log(article.title);
            let articles_contact = $("#articles");
            let ul = $("<ul>");
            let li = $("<li>");
            let a = $("<a>");
            a.attr("href","https://www.canada.ca/en/health-canada/services/food-nutrition/genetically-modified-foods-other-novel-foods/approved-products/novel-food-information-biscuits-leclerc-praeventia-cookies-wine-extract.html")
            a.append(article.title);
            li.append(a);
            ul.append(li);
            articles_contact.append(ul);
        }
    })
})
const app = Vue.createApp({
    // Shorthand syntax for data: function() {}
    data() {
      return {
        // The properties of this returned object are then accessible from our template (within e.g., index.html)
        model: '4070 Ti',
        price: '$1600',
        cores: 7680,
        // Should we show the graphics card?
        showCard: true
      }
    },
    methods: {
        changeModel(model, price, cores) {
          this.model = model
          this.price = price
          this.cores = cores
        },
        toggleCard() {
            // Flip the boolean value
            this.showCard = !this.showCard;
        }
      }
  }).mount('#app')