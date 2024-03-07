import axios from 'axios';

//instanciranje axiosa za potrebe backenda
let Service = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 1000
});

//objekt koji sadrzi metode za backend i pozive posta

let Posts= {
    async add(post) {
        try {
            return Service.post('/posts', post);
        }catch (error){
            console.error('Greška u dodavanju kartica:', error);
            throw error;
        }
    },
    async getAll(searchTerm) {
        try {
            let options = {};

            if (searchTerm) {
                options.params = {
                    title: searchTerm
                };
            }
            let r = await Service.get('/posts', options);
            return r.data.map(doc => {
                return {
                    id: doc._id,
                    source: doc.source,
                    name: doc.name,
                    location: doc.location,
                    date: doc.date,
                    time: doc.time,
                    numOfRatings: doc.numOfRatings,
                    rating: doc.rating
                };
            });
        } catch (error){
            console.error('Greška u dohvaćanju kartica:', error);
            throw error;
        }
    } 
}

export {Service, Posts};