function DashboardFunctionality({modalState, setModalState,}){
    return (
            <div>
            <div className={`dashboard-functionality--overlay overlay ${modalState.className}`}></div>
            <div className={`dashboard-functionality modal ${modalState.className}`}>
            <div className="dashboard-functionality-close" onClick={()=>setModalState(state=>{return {...state, className: ''}} )}>
                    <span className="material-icons">disabled_by_default</span>
            </div>
            {modalState.currentComponent != null ?
            <modalState.currentComponent />
            :
            null
    }   
            </div>
            </div>
            )
}

export default React.memo(DashboardFunctionality);