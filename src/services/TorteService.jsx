import axios from 'axios';
 
class TortesService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || 'http://localhost:5005'
    });
     // Automatically set JWT token in the headers for every request
     this.api.interceptors.request.use(config => {
        // Retrieve the JWT token from the local storage
        const storedToken = localStorage.getItem('authToken');
   
        if (storedToken) {
          config.headers = { Authorization: `Bearer ${storedToken}` };
        }
   
        return config;
      });
    }
      // POST /api/tortes
  createTorte = requestBody => {
    return this.api.post('/api/tortes', requestBody);
  };
 
  // GET /api/tortes
  getAllTortes = () => {
    return this.api.get('/api/tortes');
  };
 
  // GET /api/tortes/:id
  getTorte(id){
    return this.api.get(`/api/tortes/${id}`);
  };
 
  // PUT /api/tortes/:id
  updateTorte = (id, requestBody) => {
    return this.api.put(`/api/tortes/${id}`, requestBody);
  };
 
  // DELETE /api/tortes/:id
  deleteTorte = id => {
    return this.api.delete(`/api/tortes/${id}`);
  };
}
 
// Create one instance object
const tortesService = new TortesService();
 
export default tortesService;