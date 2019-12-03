const v3 = require('../../config/BC').v3;
const lupus = require('lupus');

class SystemLogs {
    constructor(){
        this.v3 = v3
        this.state = {
            current_page: 0,
            next_page: 1
        }
        this.totalPages = 1382
        this.logs = [];
        this.meta = {};
        this.getData = this.getData.bind(this)
    }
    async initClass() {
        await this.getMeta();
        await this.getData();
    }
    systemLogs() {
        return this.v3.get(`/store/systemlogs?severity=4&page=${this.state.next_page}`)
    }

    getMeta() {
        return (async () => {
            const { meta } = await this.systemLogs();
            this.meta = meta;
            return meta;
        })();
    }
    async currentPage() {
        const { pagination } = await this.getMeta();
        const { data } = await this.systemLogs()

        await data.map(x => {
            const dateFilter = x.date_created.split('T')[0]
            if(dateFilter === '2019-06-18'){
                this.logs.push(x)
            }
        })

        this.state.current_page = this.meta.pagination.current_page;
        this.state.next_page = this.meta.pagination.current_page + 1;

        return this.state;
    }

    async getData() {
        const $this = this;
        lupus(1, this.totalPages, async function(n) {
            await $this.currentPage()
            console.log("We're on:", n);
          }, function() {
            console.log('All done!');
          });
    }


}
module.exports = SystemLogs
