const db = require("../dbConfig")

class Mountain {
    constructor(data) {
        this.id = data.id
        this.name = data.name
        this.height = data.height
        this.country = data.country
        this.firstSummit = data.firstSummit
    }

    static get all() {
        return new Promise (async (resolve, reject) => {
            try {
                const mountainsData = await db.query('SELECT * FROM mountains;')
                const mountains = mountainsData.rows.map(m => new Mountain(m))
                resolve(mountains)
            } catch (err) {
                reject("Error retrieving mountains")
            }
        })
    }
}

module.exports = Mountain;