export const userReducer =  async (state,action) =>{
    switch(action.type){
        case 'REMOVE_USER':
          console.log("SIGNOUT")
            return {
                id : null,
                username:"",
              }
 
          case 'SET_USER':
            console.log(action.user[0])
              return {
                  id : action.user[0]._id,
                  username: action.user[0].username,
                }
        default:
          console.log("Default")
            return state
    }
}