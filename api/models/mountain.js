const db = require("../dbConfig")

class Mountain {
    constructor(data) {
        this.id = data.id
        this.name = data.name
        this.height = data.height
        this.country = data.country
        this.firstSummit = data.first_summit
    }

    static get all() {
        return new Promise (async (resolve, reject) => {
            try {
                const mountainsData = await db.query('SELECT * FROM mountains;')
                const mountains = mountainsData.rows.map(m => new Mountain(m))
                console.log(typeof(mountains[0].firstSummit), mountains[0].firstSummit)
                resolve(mountains)
            } catch (err) {
                reject("Error retrieving mountains")
            }
        })
    }

    static findById (id) {
        return new Promise (async (resolve, reject) => {
            try {
                const mountainData = await db.query(`SELECT * FROM mountains WHERE id = $1;`, [id])
                const mountain = new Mountain(mountainData.rows[0]);
                resolve (mountain);
            } catch (err) {
                reject('Moutain not found');
            }
        });
    }

    static create(data) {
        return new Promise (async (resolve, reject) => {
            try {
                const mountainData = await db.query(`INSERT INTO mountains (name, height, country, firstSummit) VALUES ($1, $2, $3, $4) RETURNING *` [data.name, data.height, data.country, data.firstSummit]);
                const newMountain = new Mountain(mountainData.rows[0]);
                resolve (newMountain);
            } catch (err) {
                reject('Error creating mountain');
            }
        });
    }

    update(data) {
        return new Promise (async (resolve, reject) => {
            try {
                let queryString = `UPDATE mountains SET `
                const possibleFields = ['name', 'height', 'country', 'firstSummit'];
                for (const field of possibleFields) {
                    if (data[field]) {
                        queryString += (`${field} = ${data[field]} `)
                    }
                }
                if (queryString == `UPDATE mountains SET `) {
                    throw new Error ('Invalid data for update')
                }
                queryString += (`WHERE id = ${this.id} RETURNING *;`)
                const updatedMountainData = await db.query(queryString);
                const updatedMountain = new Mountain(updatedMountainData.rows[0]);
                resolve(updatedMountain);
            } catch (err) {
                reject (err || 'Error updating mountain');
            }
        })
    }

    destroy() {
        return new Promise (async (resolve, reject) => {
            try {
                await db.query(`DELETE FROM mountain WHERE id = $1;` [this.id]);
                resolve('Mountain was deleted');
            } catch (err) {
                reject('Mountain could not be deleted');
            }
        })
    }
}

module.exports = Mountain;