import * as PostsApi from "../api/PostsRequest";

export const getTimeLinePosts= (id)=> async(dispatch)=>{
    dispatch({type: "RETREIVING_START"});
    try {
        const {data} = await PostsApi.getTimeLinePosts(id);
        dispatch({type: "RETREIVING_SUCCESS", data: data});
    } catch (error) {
    dispatch({type: "RETREIVING_FAIL"})
    console.log(error);
        
    }
};