export const userReducer =  async (state,action) =>{
    switch(action.type){
        case 'REMOVE_USER':
            return {
                id : null,
                username:"",
              }
 
          case 'SET_USER':
              return {
                  id : action.user[0]._id,
                  username: action.user[0].username,
                }
        default:
            return state
    }
}