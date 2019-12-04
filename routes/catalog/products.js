const v3 = require('../../config/BC').v3;
const fastcsv = require('fast-csv');
const fs = require('fs');
const ws = fs.createWriteStream("data.csv");

class Products {
    constructor(){
        this.v3 = v3
        this.totalPages = {}
        this.items = [];
        this.id = [];
        this.meta = {
            current_page:1
        };
    }
    async initClass() {
        await this.getProdsMeta();
         await this.getData();
    }
    async getProds() {
        return this.v3.get(`/catalog/products?limit=50&page=${this.meta.current_page}`)
    }

   async getProdsMeta() {
        return (async () => {
            const { meta } = await this.getProds();
            this.meta = meta.pagination;
            return this.meta;
        })();
    }

    async currentPage() {
        const { data } = await this.getProds();
        await this.getProdsMeta();
        await data.map(x => {
                this.items.push({
                    id: x.id, 
                    name: x.name,
                     sku: x.sku, 
                     price: x.price,
                     inventory: x.inventory
            })
                console.log(x.id)
        })
        return this;
    }

    async getData() {
        for (let index = 0; index < this.meta.total_pages; index++) {
            await this.currentPage();
            if(this.meta.current_page === this.meta.total_pages){
                console.log("We're Finished!:", this.meta.current_page +' of '+ this.meta.total_pages);
                fastcsv
                .write(this.items, { headers: true })
                .pipe(ws);
            }
            else {
                console.log("We're on:", this.meta.current_page +' of '+ this.meta.total_pages);
            }
            this.meta.current_page = this.meta.current_page+1;
        }

        return this;
    }


}
module.exports = Products
