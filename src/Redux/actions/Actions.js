import { FETCH_POST, NEW_POST } from './types';

export const fetchPosts = () => dispatch => {
        axios.get('HTTP')
            .then( res => dispatch({
                type: FETCH_POST,
                payload: posts
         }))
}