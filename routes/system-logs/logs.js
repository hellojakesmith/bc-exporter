const v3 = require('../../config/BC').v3;

class SystemLogs {
    constructor(){
        this.v3 = v3
        this.state = {
            current_page: 1300,
            next_page: 1301
        }
        this.totalPages = 85
        this.logs = [];
        this.meta = {};
    }
    async initClass() {
        await this.getMeta();
        await this.getData();
    }
    systemLogs() {
        return this.v3.get(`/store/systemlogs?severity=4&type=payment&limit=20&page=${this.state.next_page}`)
    }

    async currentPage() {
        const { meta } = await this.systemLogs();
        const { data } = await this.systemLogs()

        await data.map(x => {
            const dateFilter = x.date_created.split('T')[0]
            if(dateFilter === '2019-12-02'){
                this.logs.push(x)
                console.log(x.id)
            }
        })

        this.state.current_page = meta.current_page;
        this.state.next_page = meta.current_page + 1;

        return this;
    }

    async getData() {
      for (let index = 0; index < this.totalPages; index++) {
        await this.currentPage().
        console.log("We're on:", this.state.current_page);
      }
    }


}
module.exports = SystemLogs
