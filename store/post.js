export const state = ({
    draft:[]
})

export const mutations = ({
    setdraft(state, data){
        if(state.draft.length < 5){
            console.log(data)
            state.draft.push(data)
        }else{
            state.draft.shift()
            state.draft.push(data)
        }
    }
})