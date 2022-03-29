function mapReducer(state = {}, action) {
    switch (action.type) {
        case "move/left":
            return {
                ...state
            };

        case "incr/clicked":
            let newMap = [...state.map];

            newMap[action.pos[1]][action.pos[0]] = newMap[action.pos[1]][action.pos[0]] % 7 + 1;

            return {
                ...state,
                map: newMap
            }

        default:
            return state;
    }
}

export default mapReducer;