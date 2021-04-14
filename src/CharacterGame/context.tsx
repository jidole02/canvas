import React, { useReducer, useContext, createContext, Dispatch } from 'react'

type State = {
    obx:number // 장애물 위치
};

type Action = 
    | { type : 'OB_PLACE'; obx : number | null }

type SampleDispatch = Dispatch<Action>;

const context = createContext<State | null>(null);
const dispatchContext = createContext<SampleDispatch | null>(null);

function reducer(state : State, action : Action): State{
    switch(action.type){
        case 'OB_PLACE' : 
            return {
                ...state,
                obx : action.obx
            }
        default:
            throw new Error('NOTING')
    }
}

export function SampleProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer, {
        obx : null
    });
  
    return (
      <context.Provider value={state}>
        <dispatchContext.Provider value={dispatch}>
          {children}
        </dispatchContext.Provider>
      </context.Provider>
    );
  }
  
  export function GetState() {
    const state = useContext(context);
    if (!state) throw new Error('Cannot find SampleProvider'); 
    return state;
  }
  
  export function SetState() {
    const dispatch = useContext(dispatchContext);
    if (!dispatch) throw new Error('Cannot find SampleProvider');
    return dispatch;
  }