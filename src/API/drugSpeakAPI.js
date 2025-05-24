import axios from 'axios';

async function fetchPost() {
    try {
        const response = await axios.get(
            'http://localhost:3000'
        );
        console.log(response.data);
    } catch (error) {
        console.error("Error:", error);
    }
}
fetchPost();